import request from "supertest";
import "@babel/polyfill";
import app from "./app";

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
    app.locals.notes = notes
  });
  describe("GET /api/v1/notes", () =>{
    it('should have a status of 200', async() => {
        const response = await request(app).get("/api/v1/notes");
        expect(response.statusCode).toBe(200);
    });

    it('should return an array of notes', async () => {
        const response = await request(app).get("/api/v1/notes");
        expect(response.body.notes).toEqual(notes)
    });
  })

  describe("GET /api/v1/notes/:id", () => {
      it('should return a status of 200', async()=> {
        const response = await request(app).get("/api/v1/notes/1");
        expect(response.statusCode).toBe(200);

      });

      it('should return a note', async() => {
        const response = await request(app).get("/api/v1/notes/1");
        expect(response.body).toEqual(notes[0])
      })
  })
});
