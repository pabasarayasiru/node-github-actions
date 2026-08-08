const request = require("supertest");
const app = require("../src/app");


describe("User API", () => {


    test("GET /api/users", async () => {


        const response = await request(app)
            .get("/api/users");


        expect(response.statusCode)
            .toBe(200);


        expect(response.body)
            .toBeInstanceOf(Array);


    });



    test("POST /api/users", async()=>{


        const response = await request(app)
            .post("/api/users")
            .send({
                name:"Yasiru"
            });


        expect(response.statusCode)
            .toBe(201);


        expect(response.body.name)
            .toBe("Yasiru");


    });


});