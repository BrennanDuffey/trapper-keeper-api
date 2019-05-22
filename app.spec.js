import request from "supertest";
import "@babel/polyfill";
import app from "./app";
let uuidv4 = require("uuid/v4");

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
  describe("POST /api/v1/notes", () => {
    it("should return a status code of 201", async () => {
      const note = {
        title: "randomnote",
        id: "1",
        listItems: [{ id: "1", body: "asdf", completed: false }]
      };
      const response = await request(app)
        .post("/api/v1/notes")
        .send(note);
      expect(response.statusCode).toBe(201);
    });

    it("should receive an id back", async () => {
      const note = {
        title: "randomnote",
        listItems: [{ id: "1", body: "asdf", completed: false }]
      };
      uuidv4 = jest.fn().mockImplementation(() => "10");
      36;
      const response = await request(app)
        .post("/api/v1/notes")
        .send(note);
      expect(response.body.id.length).toEqual(36);
    });

    it("return a status 422 if all information not given with correct params ", async () => {
      const note = {
        title: "randomnote"
      };
      const response = await request(app)
        .post("/api/v1/notes")
        .send(note);
      expect(response.statusCode).toBe(422);
    });
  });

  describe("PUT /api/v1/notes/:id", () => {
      it("Should return a status of 202 with the correct message", async() => {
          const updatedNote =  {
            title: "What up randomNote",
            id: "1",
            listItems: [{ id: "1", body: "asdf", completed: false }]
          }
          const response = await request(app).put('/api/v1/notes/1').send(updatedNote);
          expect(response.statusCode).toBe(202);
          expect(app.locals.notes[0]).toEqual(updatedNote)
      });

      it('should return a status code of 422 when properties are incorrect', async() => {
        const updatedNote =  {
            titlrandome: "What up randomNote",
            id: "1",
            listItems: [{ id: "1", body: "asdf", completed: false }]
          }
          const response = await request(app).put('/api/v1/notes/1').send(updatedNote);
          expect(response.statusCode).toBe(422);
      });

      it('should return a status code of 404 if it does not match at all', async() => {
        const updatedNote =  {
            title: "What up randomNote",
            id: "1",
            listItems: [{ id: "1", body: "asdf", completed: false }]
          }
          const response = await request(app).put('/api/v1/notes/9001').send(updatedNote);
          expect(response.statusCode).toBe(404);
      });
  });

  describe("DELETE /api/v1/notes/:id", () => {
      it('should return an status code of 204 and remove the note', async() => {
          expect(app.locals.notes.length).toBe(2)
          const response = await request(app).delete('/api/v1/notes/1').send()
          expect(response.statusCode).toBe(204)
          expect(app.locals.notes.length).toBe(1)
      });

      it('should return a status code of 404 and not remove the note', async() => {
        const response = await request(app).delete('/api/v1/notes/9001').send()
        expect(response.statusCode).toBe(404);
        expect(app.locals.notes.length).toBe(2)
      })

  })
});
