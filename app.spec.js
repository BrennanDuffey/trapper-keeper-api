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

    app.locals.notes
  });
});
