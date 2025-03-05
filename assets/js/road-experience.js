class RoadExperience {
    constructor(globe) {
        this.globe = globe;
        this.roadModel = null;
        this.init();
    }

    init() {
        const loader = new THREE.GLTFLoader();
        loader.load('assets/models/road.glb', (gltf) => {
            this.roadModel = gltf.scene;
            // Position the road on the globe
            this.positionRoad();
            this.globe.scene.add(this.roadModel);
        });
    }

    positionRoad() {
        // Implementation for positioning the road on the globe
    }
}
