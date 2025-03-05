document.addEventListener('DOMContentLoaded', () => {
    const globe = new Globe();
    const navigation = new Navigation(globe);
    const roadExperience = new RoadExperience(globe);
    const accessibility = new Accessibility();
    const businessData = new BusinessDataManager(globe);
});
