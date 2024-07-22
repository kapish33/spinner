// import { StatusCodes } from "http-status-codes";
// import type { Mock } from "vitest";

// import { scvRepository } from "@/api/csv/csvRepository";
// import { csvService } from "@/api/csv/csvService";

// vi.mock("@/api/user/scvRepository");

// describe("csvService", () => {
//   let csvServiceInstance: csvService;
//   let scvRepositoryInstance: scvRepository;

//   // IProduct[]
//   const mockCsv: any = [
//     {
//       _id: "669e644d5404baa6107bede8",
//       requestId: "bf982b44-f7b2-4681-b6fa-c34d05a04555",
//       serialNumber: 1,
//       productName: "SKU1",
//       inputImageUrls: [
//         "https://images.pexels.com/photos/21430948/pexels-photo-21430948/free-photo-of-a-man-holding-a-camera.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//         "https://images.pexels.com/photos/18749534/pexels-photo-18749534/free-photo-of-man-in-tank-top-throwing-basketball-ball.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//       ],
//       outputImageUrls: [
//         "output/resized-Untitled spreadsheet - Sheet1-bf982b44-f7b2-4681-b6fa-c34d05a04555.csv-free-photo-of-a-man-holding-a-camera.jpeg",
//         "output/resized-Untitled spreadsheet - Sheet1-bf982b44-f7b2-4681-b6fa-c34d05a04555.csv-free-photo-of-man-in-tank-top-throwing-basketball-ball.jpeg",
//       ],
//       createdAt: "2024-07-22T13:53:17.564Z",
//       updatedAt: "2024-07-22T13:53:18.351Z",
//     },
//     {
//       _id: "669e644e5404baa6107bedeb",
//       requestId: "bf982b44-f7b2-4681-b6fa-c34d05a04555",
//       serialNumber: 2,
//       productName: "SKU2",
//       inputImageUrls: [
//         "https://images.pexels.com/photos/10397632/pexels-photo-10397632.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//         "https://images.pexels.com/photos/8693983/pexels-photo-8693983.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//       ],
//       outputImageUrls: [
//         "output/resized-Untitled spreadsheet - Sheet1-bf982b44-f7b2-4681-b6fa-c34d05a04555.csv-pexels-photo-10397632.jpeg",
//         "output/resized-Untitled spreadsheet - Sheet1-bf982b44-f7b2-4681-b6fa-c34d05a04555.csv-pexels-photo-8693983.jpeg",
//       ],
//       createdAt: "2024-07-22T13:53:18.521Z",
//       updatedAt: "2024-07-22T13:53:19.025Z",
//     },
//   ];

//   beforeEach(() => {
//     scvRepositoryInstance = new scvRepository();
//     csvServiceInstance = new csvService(scvRepositoryInstance);
//   });

//   describe("findById", () => {
//     it("returns a csv for a valid ID", async () => {
//       // Arrange
//       const testId = "bf982b44-f7b2-4681-b6fa-c34d05a04555";
//       const mockUser = mockCsv.find(
//         (requestId: any) => requestId.id === testId
//       );
//       (scvRepositoryInstance.findByIdAsync as Mock).mockReturnValue(mockUser);

//       // Act
//       const result = await csvServiceInstance.findById(testId);

//       // Assert
//       expect(result.statusCode).toEqual(StatusCodes.OK);
//       expect(result.success).toBeTruthy();
//       expect(result.message).equals("CSV found");
//       expect(result.responseObject).toEqual(mockUser);
//     });

//     it("handles errors for findByIdAsync", async () => {
//       // Arrange
//       const testId = "bf982b44-f7b2-4681-b6fa-c34d05a0455";
//       (scvRepositoryInstance.findByIdAsync as Mock).mockRejectedValue(
//         new Error("Database error")
//       );

//       // Act
//       const result = await csvServiceInstance.findById(testId);

//       // Assert
//       expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
//       expect(result.success).toBeFalsy();
//       expect(result.message).equals("An error occurred while finding user.");
//       expect(result.responseObject).toBeNull();
//     });

//     it("returns a not found error for non-existent ID", async () => {
//       // Arrange
//       const testId = "as";
//       (scvRepositoryInstance.findByIdAsync as Mock).mockReturnValue(null);

//       // Act
//       const result = await csvServiceInstance.findById(testId);

//       // Assert
//       expect(result.statusCode).toEqual(StatusCodes.NOT_FOUND);
//       expect(result.success).toBeFalsy();
//       expect(result.message).equals("CSV not found");
//       expect(result.responseObject).toBeNull();
//     });
//   });
// });
