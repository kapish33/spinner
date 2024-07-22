// import { StatusCodes } from "http-status-codes";
// import request from "supertest";

// import type { CSV } from "@/api/csv/csvModel";
// import type { ServiceResponse } from "@/common/models/serviceResponse";
// import { app } from "@/server";

// describe("CSV API Endpoints", () => {
  

//   describe("GET /csv/:id", () => {
    

//     it("should return a not found error for non-existent ID", async () => {
//       // Arrange
//       const testId = Number.MAX_SAFE_INTEGER;

//       // Act
//       const response = await request(app).get(`/csv/${testId}`);
//       const responseBody: ServiceResponse = response.body;

//       // Assert
//       expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND);
//       expect(responseBody.success).toBeFalsy();
//       expect(responseBody.message).toContain("CSV not found");
//       expect(responseBody.responseObject).toBeNull();
//     });

//     it("should return a bad request for invalid ID format", async () => {
//       // Act
//       const invalidInput = "abc";
//       const response = await request(app).get(`/csv/${invalidInput}`);
//       const responseBody: ServiceResponse = response.body;

//       // Assert
//       expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
//       expect(responseBody.success).toBeFalsy();
//       expect(responseBody.message).toContain("Invalid input");
//       expect(responseBody.responseObject).toBeNull();
//     });
//   });
// });

// function comparecsvs(mockUser: CSV, responseUser: CSV) {
//   if (!mockUser || !responseUser) {
//     throw new Error("Invalid test data: mockUser or responseUser is undefined");
//   }

//   expect(responseUser.id).toEqual(mockUser.id);
//   expect(responseUser.name).toEqual(mockUser.name);
//   expect(responseUser.email).toEqual(mockUser.email);
//   expect(responseUser.age).toEqual(mockUser.age);
//   expect(new Date(responseUser.createdAt)).toEqual(mockUser.createdAt);
//   expect(new Date(responseUser.updatedAt)).toEqual(mockUser.updatedAt);
// }
