class Globe {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.globe = null;
        this.textureLoader = new THREE.TextureLoader();
        this.isDragging = false;
        this.previousMousePosition = { x: 0, y: 0 };
        this.autoRotationSpeed = 0.001;
        this.markers = [];
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.hoveredMarker = null;
        this.radius = 1;
        this.init();
        this.initDragControls();
        this.initZoomControls();
        this.initClickHandler();
        this.initInteractionHandlers();
    }

    init() {
        // Setup renderer
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setClearColor(0x000000, 1);
        document.getElementById('globe-container').appendChild(this.renderer.domElement);

        // Setup camera
        this.camera.position.z = 2.5;

        // Create globe
        const geometry = new THREE.SphereGeometry(1, 64, 64);
        
        // Using different texture URLs that are known to work
        const textureUrl = 'https://raw.githubusercontent.com/turban/webgl-earth/master/images/2_no_clouds_4k.jpg';
        const normalMapUrl = 'https://raw.githubusercontent.com/turban/webgl-earth/master/images/elev_bump_4k.jpg';
        const specularMapUrl = 'https://raw.githubusercontent.com/turban/webgl-earth/master/images/water_4k.png';

        Promise.all([
            this.loadTexture(textureUrl),
            this.loadTexture(normalMapUrl),
            this.loadTexture(specularMapUrl)
        ]).then(([texture, normalMap, specularMap]) => {
            const material = new THREE.MeshPhongMaterial({
                map: texture,
                normalMap: normalMap,
                specularMap: specularMap,
                normalScale: new THREE.Vector2(0.1, 0.1),
                shininess: 0.5,
                specular: new THREE.Color(0x333333)
            });

            this.globe = new THREE.Mesh(geometry, material);
            this.scene.add(this.globe);
        }).catch(error => {
            console.error('Error loading textures:', error);
        });

        // Enhanced lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 1.5);
        pointLight.position.set(5, 3, 5);
        this.scene.add(pointLight);

        // Add atmospheric glow
        this.addAtmosphere();

        // Start animation
        this.animate();

        // Handle window resize
        window.addEventListener('resize', this.onWindowResize.bind(this));
    }

    initDragControls() {
        const container = document.getElementById('globe-container');
        
        container.addEventListener('mousedown', (e) => {
            this.isDragging = true;
            this.previousMousePosition = {
                x: e.clientX,
                y: e.clientY
            };
        });

        container.addEventListener('mousemove', (e) => {
            if (!this.isDragging) return;

            const deltaMove = {
                x: e.clientX - this.previousMousePosition.x,
                y: e.clientY - this.previousMousePosition.y
            };

            if (this.globe) {
                this.globe.rotation.y += deltaMove.x * 0.005;
                this.globe.rotation.x += deltaMove.y * 0.005;
            }

            this.previousMousePosition = {
                x: e.clientX,
                y: e.clientY
            };
        });

        container.addEventListener('mouseup', () => {
            this.isDragging = false;
        });
    }

    loadTexture(url) {
        return new Promise((resolve, reject) => {
            this.textureLoader.load(
                url,
                texture => resolve(texture),
                undefined,
                error => reject(error)
            );
        });
    }

    addAtmosphere() {
        const atmosphere = new THREE.Mesh(
            new THREE.SphereGeometry(1.1, 64, 64),
            new THREE.ShaderMaterial({
                transparent: true,
                side: THREE.BackSide,
                vertexShader: `
                    varying vec3 vNormal;
                    void main() {
                        vNormal = normalize(normalMatrix * normal);
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    }
                `,
                fragmentShader: `
                    varying vec3 vNormal;
                    void main() {
                        float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
                        gl_FragColor = vec4(0.3, 0.6, 1.0, intensity);
                    }
                `
            })
        );
        this.scene.add(atmosphere);
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        
        // Update marker interactions
        this.checkMarkerIntersection();
        
        if (this.globe && !this.isDragging) {
            this.globe.rotation.y += this.autoRotationSpeed;
        }
        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    initZoomControls() {
        document.getElementById('globe-container').addEventListener('wheel', (e) => {
            e.preventDefault();
            
            const zoomSpeed = 0.1;
            const minDistance = 2;
            const maxDistance = 10;
            
            this.camera.position.z += e.deltaY * zoomSpeed;
            this.camera.position.z = Math.min(Math.max(this.camera.position.z, minDistance), maxDistance);
        });
    }

    addBusinessMarker(lat, lng, data) {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lng + 180) * (Math.PI / 180);
        
        const geometry = new THREE.SphereGeometry(0.02, 16, 16);
        const material = new THREE.MeshBasicMaterial({ 
            color: data.type === 'headquarters' ? 0xff0000 : 
                   data.type === 'regional_office' ? 0x00ff00 : 0x0000ff 
        });
        
        const marker = new THREE.Mesh(geometry, material);
        
        // Position the marker
        const x = -(Math.sin(phi) * Math.cos(theta)) * this.radius;
        const y = Math.cos(phi) * this.radius;
        const z = Math.sin(phi) * Math.sin(theta) * this.radius;
        
        marker.position.set(x, y, z);
        marker.lookAt(0, 0, 0);
        
        // Make marker interactive
        marker.userData = data;
        this.markers.push(marker);
        
        // Add hover effect
        marker.onBeforeRender = () => {
            if (this.hoveredMarker === marker) {
                marker.scale.set(1.5, 1.5, 1.5);
            } else {
                marker.scale.set(1, 1, 1);
            }
        };
        
        this.scene.add(marker);
        return marker;
    }

    clearDataLayer() {
        if (this.markers) {
            this.markers.forEach(marker => {
                this.scene.remove(marker);
            });
            this.markers = [];
        }
    }

    initClickHandler() {
        document.getElementById('globe-container').addEventListener('click', (event) => {
            // Calculate mouse position in normalized device coordinates
            const rect = this.renderer.domElement.getBoundingClientRect();
            this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            // Update the picking ray with the camera and mouse position
            this.raycaster.setFromCamera(this.mouse, this.camera);

            // Calculate objects intersecting the picking ray
            const intersects = this.raycaster.intersectObjects(this.markers);

            if (intersects.length > 0) {
                const marker = intersects[0].object;
                if (marker.userData && this.onMarkerClick) {
                    this.onMarkerClick(marker.userData);
                }
            }
        });
    }

    initInteractionHandlers() {
        const container = document.getElementById('globe-container');
        
        // Mouse move for hover effect
        container.addEventListener('mousemove', (event) => {
            const rect = this.renderer.domElement.getBoundingClientRect();
            this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            this.checkMarkerIntersection();
        });

        // Click handler
        container.addEventListener('click', (event) => {
            const rect = this.renderer.domElement.getBoundingClientRect();
            this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            const intersects = this.getMarkerIntersections();
            if (intersects.length > 0) {
                const marker = intersects[0].object;
                if (marker.userData && this.onMarkerClick) {
                    this.onMarkerClick(marker.userData);
                }
            }
        });
    }

    checkMarkerIntersection() {
        const intersects = this.getMarkerIntersections();
        
        if (intersects.length > 0) {
            const marker = intersects[0].object;
            if (this.hoveredMarker !== marker) {
                if (this.hoveredMarker) {
                    this.hoveredMarker.material.opacity = 1;
                }
                this.hoveredMarker = marker;
                marker.material.opacity = 0.8;
                document.body.style.cursor = 'pointer';
            }
        } else {
            if (this.hoveredMarker) {
                this.hoveredMarker.material.opacity = 1;
                this.hoveredMarker = null;
            }
            document.body.style.cursor = 'default';
        }
    }

    getMarkerIntersections() {
        this.raycaster.setFromCamera(this.mouse, this.camera);
        return this.raycaster.intersectObjects(this.markers);
    }
}
