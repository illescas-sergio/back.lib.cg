const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app.js');

require("dotenv").config();


/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(process.env.DB_URL);
  });
  
  /* Closing database connection after each test. */
  afterEach(async () => {
    await mongoose.connection.close();
  });

 

  describe("GET /authors", () => {

     let idUser;
     const fakeId = "asiuds"

    it("should return all authors", async () => {
      const res = await request(app).get("/authors");
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it("should add a new author", async () => {
        const res = await request(app).post("/authors").send({
            first_name: "Julio",
            last_name: "Argentino",
            dni: 12345678,
            country: "Argentina"
        })
        expect(res.statusCode).toBe(201);
        expect(res.body._id).toBeDefined();
        idUser= res.body._id
    });

    it("should return statusCode 400 on missing data", async () => {
      const res = await request(app).post("/authors").send({
          first_name: "Julio",
          // last_name: "Argentino",
          dni: 12345678,
          country: "Argentina"
      })
      expect(res.statusCode).toBe(400);
    });

    it("should return statusCode 200 update ok", async () => {
      const res = await request(app).put(`/authors/${idUser}`).send({
          first_name: "Julio",
          last_name: "Sanchez",
          dni: 12345678,
          country: "Argentina"
      })
      expect(res.statusCode).toBe(200);
    });

    it("should return statusCode 404 on failed update", async () => {
      const res = await request(app).put(`/authors/${fakeId}`).send({
          first_name: "Julio",
          last_name: "Sanchez",
          dni: 12345678,
          country: "Argentina"
      })
      expect(res.statusCode).toBe(404);
    });

    it("should return statusCode 200 on get a selected user", async () => {
      const res = await request(app).get(`/authors/${idUser}`)
      expect(res.statusCode).toBe(200);
    });

    it("should return statusCode 404 on get a selected user with wrong id", async () => {
      const res = await request(app).get(`/authors/${fakeId}`)
      expect(res.statusCode).toBe(404);
    });

    it("should return statusCode 200 on delete an author", async () => {
      const res = await request(app).delete(`/authors/${idUser}`)
      expect(res.statusCode).toBe(200);
    });

    it("should return statusCode 404 on failes delete", async () => {
      const res = await request(app).delete(`/authors/${fakeId}`)
      expect(res.statusCode).toBe(404);
    });
  });