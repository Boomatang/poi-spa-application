import { inject, Aurelia } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';
import { POI, User } from './poi-types';
import { HttpClient } from 'aurelia-http-client';
import { EventAggregator } from 'aurelia-event-aggregator';
import { TotalUpdate } from './messages';

@inject(HttpClient, EventAggregator, Aurelia, Router)
export class PoiService {
  users: Map<string, User> = new Map();
  usersById: Map<string, User> = new Map();
  poi: POI[] = [];


  constructor(
    private httpClient: HttpClient,
    private ea: EventAggregator,
    private au: Aurelia,
    private router: Router
  ) {
    httpClient.configure(http => {
      http.withBaseUrl('http://localhost:3000');
    });
    this.getPoi();
    this.getUsers();
    // this.getDonations();
  }

  async getPoi() {
    const response = await this.httpClient.get('/api/poi');
    this.poi = await response.content;
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
  //
  // async donate(amount: number, method: string, candidate: Candidate) {
  //   const donation = {
  //     amount: amount,
  //     method: method,
  //     candidate: candidate
  //   };
  //   const response = await this.httpClient.post('/api/pois/' + candidate._id + '/donations', donation);
  //   this.donations.push(donation);
  //   this.total = this.total + amount;
  //   this.ea.publish(new TotalUpdate(this.total));
  //   console.log('Total so far ' + this.total);
  // }

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
    const user = this.users.get(email);
    if (user && user.password === password) {
      this.changeRouter(PLATFORM.moduleName('app'));
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.changeRouter(PLATFORM.moduleName('start'));
  }

  changeRouter(module: string) {
    this.router.navigate('/', { replace: true, trigger: false });
    this.router.reset();
    this.au.setRoot(PLATFORM.moduleName(module));
  }

  async deleteCurrentPOI(id) {
    const response = await this.httpClient.delete(`/api/poi/${id}`);
    console.log(response);
    this.router.navigateToRoute("")
  }
}