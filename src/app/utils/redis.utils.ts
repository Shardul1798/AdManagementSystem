import { bootstrap } from "../app";

class RedisStorage {
  async insertKeyInRedis(key, value) {
    try {
      if (!key || !value) return {};
      console.log(key, value);
      value = JSON.stringify(value);
      const result = await bootstrap.client.set(key, value);
      return result;
    } catch (error) {
      console.error(error);
      return {};
    }
  }

  async getKeyFromRedis(key) {
    try {
      if (!key) return;
      const result = await bootstrap.client.get(key);
      return JSON.parse(result);
    } catch (error) {
      console.error(error);
      return {};
    }
  }

  async deleteKeyFromRedis(key) {
    try {
      if (!key) return;
      const result = await bootstrap.client.del(key);
      return result;
    } catch (error) {
      console.error(error);
      return {};
    }
  }

  async deleteUserSessionbyId(id) {
    try {
      // let scanAsync = promisify(bootstrap.client.scan).bind(bootstrap.client);
      // let delAsync = promisify(bootstrap.client.del).bind(bootstrap.client);

      // let cursor = "0";
      // do {
      //   const reply = await scanAsync(
      //     cursor,
      //     "MATCH",
      //     pattern,
      //     "COUNT",
      //     "1000"
      //   );
      //   cursor = reply[0];

      //   await delAsync(reply[1]);
      // } while (cursor !== "0");
    } catch (error) {
      console.error(error);
      return {};
    }
  }
}

export const redisStorage = new RedisStorage();
