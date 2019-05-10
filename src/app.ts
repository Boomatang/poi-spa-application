import { RouterConfiguration, Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.map([
      {
        route: ['', 'poi'],
        name: 'Poi',
        moduleId: PLATFORM.moduleName('views/pois'),
        nav: true,
        title: 'Poi'
      },

      {
        route: 'poi/:id',
        name: 'poiDetail',
        moduleId: PLATFORM.moduleName('./views/poi_detail'),
        title: "Island"
      },
      {
        route: 'create',
        name: 'poiCreate',
        moduleId: PLATFORM.moduleName('views/poi-create'),
        nav: true,
        title: 'Create'
      },
      {
        route: 'settings',
        name: 'userSettings',
        moduleId: PLATFORM.moduleName('views/settings'),
        nav: true,
        title: 'Settings'
      },
      {
        route: 'logout',
        name: 'logout',
        moduleId: PLATFORM.moduleName('views/logout'),
        nav: true,
        title: 'Logout'
      },
    ]);
    this.router = router;
  }
}
