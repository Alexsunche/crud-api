import {
  isValidUUID,
  validateUser,
  isValidFileds,
} from '../utils/validators.js';
import { readUsersData } from '../utils/dataReader.js';
import { writeUsersData } from '../utils/dataWriter.js';
import crypto from 'crypto';

const users = readUsersData();

export const routes = {
  '/api/users': {
    GET: (req, res) => {
      if (users) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Something went wrong');
      }
    },
    POST: (req, res) => {
      let reqBody = '';

      req.on('data', (chunk) => {
        reqBody += chunk.toString();
      });

      req.on('end', () => {
        const newUser = JSON.parse(reqBody);

        if (!validateUser(newUser)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Missing required fields' }));
          return;
        }

        const user = {
          id: crypto.randomUUID(),
          ...newUser,
        };

        users.push(user);
        writeUsersData(users);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(user));
      });
    },
  },

  '/api/users/': {
    GET: (req, res) => {
      const urlParts = req.url.split('/');
      const userId = urlParts[urlParts.length - 1];

      if (!isValidUUID(userId)) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Invalid userId');
        return;
      }

      const user = users.find((u) => u.id === userId);

      if (user) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(user));
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('User does not exist');
      }
    },
    PUT: (req, res) => {
      const urlParts = req.url.split('/');
      const userId = urlParts[urlParts.length - 1];

      if (!isValidUUID(userId)) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Invalid userId');
        return;
      }

      const user = users.find((u) => u.id === userId);

      if (user) {
        let reqBody = '';

        req.on('data', (chunk) => {
          reqBody += chunk.toString();
        });

        req.on('end', () => {
          const updatedUser = JSON.parse(reqBody);

          if (isValidFileds(updatedUser)) {
            for (const prop in updatedUser) {
              user[prop] = updatedUser[prop];
            }
            writeUsersData(users);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(user));
          } else {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('invalid user fields');
          }
        });
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('User does not exist');
      }
    },
    DELETE: (req, res) => {
        const urlParts = req.url.split('/');
        const userId = urlParts[urlParts.length - 1];
  
        if (!isValidUUID(userId)) {
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.end('Invalid userId');
          return;
        }
  
        const user = users.find((u) => u.id === userId);
  
        if (user) {
            const filteredUsers = users.filter(item => item.id !== userId)
            
            writeUsersData(filteredUsers);
            res.writeHead(204, { 'Content-Type': 'application/json' });
            res.end('User has been deleted');
         
        } else {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('User does not exist');
        }
      },
  },
};
