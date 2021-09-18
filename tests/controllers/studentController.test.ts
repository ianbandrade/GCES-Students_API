import app from "..";
import supertest from "supertest";

describe("Test student requests", () => {
  it("should return the example student", async () => {
    await supertest(app)
      .get("/students")
      .expect(200)
      .then((res) =>
        expect(res.body).toMatchObject([
          {
            id: 1,
            name: "John Doe",
            email: "john.doe@example.com",
            city: "Belo Horizonte",
            birth: new Date("11/13/1999").toISOString(),
          },
        ])
      );
  });

  it("should create a new student", async () => {
    const newStudent = {
      name: "John Doe 2",
      email: "john.doe.2@example.com",
      city: "Belo Horizonte",
      birth: new Date("11/13/1999").toISOString(),
    };

    await supertest(app)
      .post("/students")
      .send(newStudent)
      .then((res) => expect(res.body).toMatchObject({ id: 2, ...newStudent }));
  });


  it("should update the first student", async () => {
    const studentID = 1;
    const requestBody = {
      "name": "Johnny Doe",
      "email": "john.doe@example.com",
      "city": "Belo Horizonte",
      "birth": "1999-11-13T02:00:00.000Z"
    }

    await supertest(app)
      .put(`/students/${studentID}`)
      .send(requestBody)
      .expect(200)
      .then((res) => expect(res.body)
        .toMatchObject({ id: studentID, ...requestBody }));
  });

  it("should delete the first student", async () => {
    const studentID = 1;

    await supertest(app)
      .delete(`/students/${studentID}`)
      .expect(200);
  });

  it(`should return "User not found"`, async () => {
    const studentID = 5;

    await supertest(app)
      .delete(`/students/${studentID}`)
      .expect(404)
      .then((res) => expect(res.body)
        .toMatchObject({
          message: "User not found",
        }));;
  });
});
