import { inject, Aurelia } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';
import { POI, User } from './poi-types';
import { HttpClient } from 'aurelia-http-client';
import { EventAggregator } from 'aurelia-event-aggregator';
import { CommentUpdate } from './messages';

@inject(HttpClient, EventAggregator, Aurelia, Router)
export class PoiService {
  users: Map<string, User> = new Map();
  usersById: Map<string, User> = new Map();
  poi: POI[] = [];
  poiById: Map<string, POI> = new Map();
  user: User;


  constructor(
    private httpClient: HttpClient,
    private ea: EventAggregator,
    private au: Aurelia,
    private router: Router
  ) {
    httpClient.configure(http => {
      http.withBaseUrl('http://63.32.99.91:3000');
    });

  }

  async getPoi() {
    const response = await this.httpClient.get('/api/poi');
    this.poi = await response.content;

    this.poi.forEach(poi => {
      this.poiById.set(poi._id, poi);
    });

    console.log(this.poi);
  }

  async getPoiDetail(id) {
    const response = await this.httpClient.get(`/api/poi/${id}`);
    const poi = await response.content;
    console.log(poi);
    return poi;
  }

  async getUsers() {
    const response = await this.httpClient.get('/api/user');
    const users = await response.content;
    users.forEach(user => {
      this.users.set(user.email, user);
      this.usersById.set(user._id, user);
    });
  }

  async getUserById(id){
    const response = await this.httpClient.get(`/api/user/${id}`);
    const user = await response.content;
    console.log(user);
    return user;
  }

  async getCurrentUser(){
    const response = await this.httpClient.get(`/api/user/current`);
    const user = await response.content;
    console.log(user);
    this.user = user;
  }


  async createPoi(name: string, description: string, long: string, lat: string, zone: string, imagePath: string) {
    const poi = {
      name: name,
      description: description,
      geo: {
        long: long,
        lat: lat
      },
      category: zone,
      image: imagePath
    };

    const response = await this.httpClient.post('/api/poi', poi);
    const newPoi = await response.content;
    this.poi.push(newPoi);
  }

  async updateUser(user){
    const response = await this.httpClient.put('/api/user', user);
  }

  async signup(firstName: string, lastName: string, email: string, password: string) {
    const user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    };
    const response = await this.httpClient.post('/api/user', user);
    const newUser = await response.content;
    this.users.set(newUser.email, newUser);
    this.usersById.set(newUser._id, newUser);
    this.changeRouter(PLATFORM.moduleName('app'));
    return false;
  }

  async login(email: string, password: string) {
    const response = await this.httpClient.post('/api/user/authenticate', {
      email: email,
      password: password
    });
    const status = await response.content;
    if(status.success){
      this.httpClient.configure(configuration => {
        configuration.withHeader('Authorization', 'bearer ' + status.token);
      });
      localStorage.poi = JSON.stringify(response.content);
      await this.getPoi();
      await this.getUsers();
      await this.getCurrentUser();
      this.changeRouter(PLATFORM.moduleName('app'));
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.poi = null;

    this.httpClient.configure(configuration => {
      configuration.withHeader('Authorization', '');
    });
    this.changeRouter(PLATFORM.moduleName('start'));
  }

  changeRouter(module: string) {
    this.router.navigate('/', { replace: true, trigger: false });
    this.router.reset();
    this.au.setRoot(PLATFORM.moduleName(module));
  }

  async deleteCurrentPOI(id) {
    const response = await this.httpClient.delete(`/api/poi/${id}`);
    // console.log(response);
    await this.refreshPois();
    await this.router.navigateToRoute("Poi")
  }

  async updateCurrentPOI(poi){
    const response = await this.httpClient.put(`/api/poi`, poi);
    // console.log(response);
    await this.refreshPois();
    await this.router.navigateToRoute("poiDetail", {id: poi._id});
  }

  async refreshPois(){
    this.poi = null;
    await this.getPoi();
  }

  async checkIsAuthenticated() {
    let authenticated = false;
    if(localStorage.poi !=='null'){
      authenticated = true;
      this.httpClient.configure(configuration => {
        const auth = JSON.parse(localStorage.poi);
        configuration.withHeader('Authorization', 'bearer ' + auth.token)
      });
      await this.getPoi();
      await this.getUsers();
      this.changeRouter(PLATFORM.moduleName('app'))
    }
  }

  async addComment(id, comment){
    console.log("Comment has been added");

    const response = await this.httpClient.post(`/api/poi/${id}/comment`, {comment: comment});
    console.log(response.response);

    // const poi = this.poiById.get(id);
    // poi.comments.push(comment);
    // this.poiById.set(id, poi);
    this.ea.publish(new CommentUpdate(response.response, id));
    //
    // await this.refreshPois();
  }

}
