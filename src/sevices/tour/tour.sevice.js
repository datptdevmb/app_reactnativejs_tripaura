import axios from 'axios';
import {POPULAR_TOUR, TOUR_BY_ID, TOURS_API, TOURSBYCATEID_API} from '../../constants/api';

class Tour {
  constructor() {
    this.tours = [];
  }

  getTours = async () => {
    try {
      const response = await axios.get(TOURS_API);
      this.tours = response;
      return this.tours;
    } catch (error) {
      console.log(error.message);
    }
  };
  getTourByCateId = async cateId => {
    try {
      const reponse = await axios.post(TOURSBYCATEID_API, {categoryId: cateId});
      this.tours = reponse.data;
      console.log(reponse.data)
      return this.tours;
    } catch (error) {
      console.log('errrr' + error);
    }
  };

  getTourById = async tourId => {
    try {
      const reponse = await axios.post(TOUR_BY_ID,{tourId});
      this.tours = reponse.data;
      return this.tours;
    } catch (error) {
      console.log('errrr' + error);
    }
  };

  getPopularTours = async ()=>{
    try {
      const reponse = await axios.get(POPULAR_TOUR);
      this.tours = reponse.data;
      return this.tours;
    } catch (error) {
      console.log(error)
    }
  }
}

export default new Tour();
