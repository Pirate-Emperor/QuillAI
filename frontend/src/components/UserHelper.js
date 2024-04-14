import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

export async function getIP() {
    try { // ipify crunch
      const response = await axios.get('https://api.ipify.org?format=json');
      return response.data.ip;
    } catch (error) {
      console.error('Error getting IP address:', error);
      return '127.0.0.1'; // default IP 
    }
  }
export async function generateUniquePostId() {
    const ip = await getIP();
    const timestamp = Date.now();
    const randomValue = Math.random().toString(36).substring(2, 12); // Generate a random value
    const combinedString = `${ip}-${timestamp}-${randomValue}`;
    return uuidv4(combinedString);
}      
export function extractIFrameSrc(content) {
    const regex = /<iframe src="(.*?)"/i; // regular expression for iframe src
    const match = content.match(regex);
    if (match) {
        return match[1]; // get the iframe src
    }
    return null;
}