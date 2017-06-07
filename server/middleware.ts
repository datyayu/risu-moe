// Dependencies
import { Router } from "express";
import { json as jsonParser } from "body-parser";
import { promisifyAll } from "bluebird";
import * as redis from "redis";

// Redis setup
promisifyAll(redis.RedisClient.prototype);
promisifyAll(redis.Multi.prototype);

// App instances
export const middleware = Router();

// Middleware
middleware.use(jsonParser());
