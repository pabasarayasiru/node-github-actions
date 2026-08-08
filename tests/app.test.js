const request = require("supertest");
const app = require("../src/app");

describe("User API", () => {

    describe("GET /api/users", () => {

        test("should return all users with status 200", async () => {
            const response = await request(app)
                .get("/api/users");

            expect(response.statusCode).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        });


        test("should return users with id and name", async () => {
            const response = await request(app)
                .get("/api/users");

            expect(response.statusCode).toBe(200);

            response.body.forEach((user) => {
                expect(user).toHaveProperty("id");
                expect(user).toHaveProperty("name");

                expect(typeof user.id).toBe("number");
                expect(typeof user.name).toBe("string");
            });
        });


        test("should return John as the initial user", async () => {
            const response = await request(app)
                .get("/api/users");

            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        id: 1,
                        name: "John"
                    })
                ])
            );
        });


        test("should return JSON content type", async () => {
            const response = await request(app)
                .get("/api/users");

            expect(response.headers["content-type"])
                .toMatch(/json/);
        });
    });


    describe("POST /api/users", () => {

        test("should create a new user successfully", async () => {
            const response = await request(app)
                .post("/api/users")
                .send({
                    name: "Yasiru"
                });

            expect(response.statusCode).toBe(201);

            expect(response.body).toHaveProperty("id");
            expect(response.body).toHaveProperty("name");

            expect(response.body.name).toBe("Yasiru");
        });


        test("should generate an id for the new user", async () => {
            const response = await request(app)
                .post("/api/users")
                .send({
                    name: "Kamal"
                });

            expect(response.statusCode).toBe(201);

            expect(typeof response.body.id).toBe("number");
            expect(response.body.id).toBeGreaterThan(0);
        });


        test("should return the created user in the response", async () => {
            const response = await request(app)
                .post("/api/users")
                .send({
                    name: "Nimal"
                });

            expect(response.statusCode).toBe(201);

            expect(response.body).toEqual(
                expect.objectContaining({
                    name: "Nimal"
                })
            );
        });


        test("should add the new user to the users list", async () => {
            await request(app)
                .post("/api/users")
                .send({
                    name: "Saman"
                });

            const response = await request(app)
                .get("/api/users");

            expect(response.statusCode).toBe(200);

            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        name: "Saman"
                    })
                ])
            );
        });


        test("should create different users with different ids", async () => {
            const response1 = await request(app)
                .post("/api/users")
                .send({
                    name: "User One"
                });

            const response2 = await request(app)
                .post("/api/users")
                .send({
                    name: "User Two"
                });

            expect(response1.statusCode).toBe(201);
            expect(response2.statusCode).toBe(201);

            expect(response1.body.id)
                .not.toBe(response2.body.id);
        });


        test("should accept different valid names", async () => {
            const names = [
                "Alice",
                "Bob",
                "Yasiru"
            ];

            for (const name of names) {
                const response = await request(app)
                    .post("/api/users")
                    .send({ name });

                expect(response.statusCode).toBe(201);
                expect(response.body.name).toBe(name);
            }
        });
    });


    describe("Invalid routes", () => {

        test("should return 404 for an unknown GET endpoint", async () => {
            const response = await request(app)
                .get("/api/unknown");

            expect(response.statusCode).toBe(404);
        });


        test("should return 404 for an unknown POST endpoint", async () => {
            const response = await request(app)
                .post("/api/unknown")
                .send({
                    name: "Test"
                });

            expect(response.statusCode).toBe(404);
        });
    });
});