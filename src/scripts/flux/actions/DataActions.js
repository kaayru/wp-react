import axios from 'axios';
import alt   from 'flux/alt/alt.js';

class DataActions {

    constructor() {
        const appUrl = 'http://wpreact.local/'; // Wordpress installation url

        this.pagesEndPoint = `${appUrl}/wp-json/wp/v2/pages`; // Endpoint for getting Wordpress Pages
        this.postsEndPoint = `${appUrl}/wp-json/wp/v2/posts`; // Endpoint for getting Wordpress Posts
    }

    // Method for getting data from the provided end point url
    api(endPoint) {
        return new Promise((resolve, reject) => {
            axios.get(endPoint).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            }); 
        });     
    }

    getPagesAndPosts() {
        return Promise.all([this.getPages(), this.getPosts()]).then((response) => {
            const posts     = response
            const payload   = { 
                pages: response[0], 
                posts: response[1] 
            };
            this.getSuccess(payload); // Pass returned data to the store
            return payload;
        })
        
    }

    // Method for getting Pages data
    getPages() {
        return this.api(this.pagesEndPoint);
    }
    getPosts() {
        return this.api(this.postsEndPoint);
    }

    // This returnes an object with Pages and Posts data together
    // The Alt Store will listen for this method to fire and will store the returned data
    getSuccess(payload){
        return payload;
    }
}

export default alt.createActions(DataActions);
