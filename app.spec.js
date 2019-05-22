import request from "supertest";
import "@babel/polyfill";
import app from "./app";
let uuidv4 = require('uuid/v4');

describe("API", () => {
  let notes;
  beforeEach(() => {
    notes = [
      {
        title: "randomnote",
        id: "1",
        listItems: [{ id: "1", body: "asdf", completed: false }]
      },
      {
        title: "randomnoteTWO",
        id: "2",
        listItems: [{ id: "2", body: "asdf", completed: false }]
      }
    ];
    app.locals.notes = notes;
  });
  describe("GET /api/v1/notes", () => {
    it("should have a status of 200", async () => {
      const response = await request(app).get("/api/v1/notes");
      expect(response.statusCode).toBe(200);
    });

    it("should return an array of notes", async () => {
      const response = await request(app).get("/api/v1/notes");
      expect(response.body.notes).toEqual(notes);
    });
  });

  describe("GET /api/v1/notes/:id", () => {
    it("should return a status of 200", async () => {
      const response = await request(app).get("/api/v1/notes/1");
      expect(response.statusCode).toBe(200);
    });

    it("should return a note", async () => {
      const response = await request(app).get("/api/v1/notes/1");
      expect(response.body).toEqual(notes[0]);
    });

    it("should return 404 if the notes does not exist", async () => {
      const response = await request(app).get("/api/v1/notes/5");
      expect(response.statusCode).toBe(404);
    });
  });
  describe('POST /api/v1/notes', () => {
      it('should return a status code of 201', async() => {
        const note =   {
            title: "randomnote",
            id: "1",
            listItems: [{ id: "1", body: "asdf", completed: false }]
          }
        const response = await request(app).post("/api/v1/notes").send(note);
        expect(response.statusCode).toBe(201);
      });

      it('should receive an id back', async() => {
        const note =   {
            title: "randomnote",
            listItems: [{ id: "1", body: "asdf", completed: false }]
          }
        uuidv4 = jest.fn().mockImplementation(() => '10');  36
        const response = await request(app).post("/api/v1/notes").send(note);
        expect(response.body.id.length).toEqual(36)
      })
  })

});
