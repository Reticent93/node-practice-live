const pool = require("../db/db");
const queries = require("./queries");
const {
  getUsers,
  getUserById,
  checkEmailExists,
  createUser,
  updateUser,
  deleteUser,
} = require("./user-controller");

jest.mock("../db/db");
jest.mock("./queries");

//write a beforeEach function to clear all queries
// beforeEach(() => {
//     jest.clearAllMocks();
// });

//write a mock function test for getUsers function
describe("getUsers function", () => {
  it("should fetch all users and return them as JSON", () => {
    const mockUsers = [
      { id: 1, name: "John" },
      { id: 2, name: "Jane" },
    ];
    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockNext = jest.fn();

    pool.query.mockImplementation((query, callback) => {
      expect(query).toBe(queries.getUsers);
      callback(null, { rows: mockUsers });
    });

    getUsers(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockUsers);
    expect(mockNext).toHaveBeenCalled();
  });

  it("should throw an error if there's a database error", () => {
    const mockError = new Error("Database error");
    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockNext = jest.fn();

    pool.query.mockImplementation((query, callback) => {
      expect(query).toBe(queries.getUsers);
      callback(mockError);
    });

    expect(() => getUsers(mockReq, mockRes, mockNext)).toThrow(mockError);
    expect(mockRes.status).not.toHaveBeenCalled();
    expect(mockRes.json).not.toHaveBeenCalled();
    expect(mockNext).not.toHaveBeenCalled();
  });
});

describe("getUserById function", () => {
    it("should fetch a user by id and return it as JSON", () => {
      const mockUser = [{ id: 1, name: "John", email: "jon@test.com" }];
      const mockReq = { params: { id: 1 } };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      pool.query.mockImplementation((query, values, callback) => {
        expect(query).toBe(queries.getUserById);
        expect(values).toEqual([mockReq.params.id]);
        callback(null, { rows: [mockUser] });
      });
  
      getUserById(mockReq, mockRes);
  
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith([mockUser]);
    });
  
    it("should throw an error if there is a database error", () => {
      const mockError = new Error("Database error");
      const mockReq = { params: { id: 1 } };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      pool.query.mockImplementation((query, values, callback) => {
        expect(query).toBe(queries.getUserById);
        expect(values).toEqual([mockReq.params.id]);
        callback(mockError, null);
      });
  
      getUserById(mockReq, mockRes);
  
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: "Database error" });
    });
  });

describe("createUser function", () => {
    it("should create a new user", () => {
      const mockUser = {
        name: "bill",
        email: "bill@test.com",
        password: "123456",
      };
      const mockReq = { body: mockUser };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      pool.query.mockImplementation((query, values, callback) => {
        if (query === queries.checkEmailExists) {
          expect(values).toEqual([mockUser.email]);
          callback(null, { rows: [{ exists: true }] }); // email already exists
        } else if (query === queries.createUser) {
          expect(values).toEqual([
            mockUser.name,
            mockUser.email,
            mockUser.password,
          ]);
          callback(null, { rows: mockUser });
        } else {
          callback(new Error("Unexpected query"));
        }
      });
  
      
  
      createUser(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(201);
    });

    // it("should return 409 status code if email already exists", () => {
    //     const mockUser = {
    //       name: "bill",
    //       email: "bill@test.com",
    //       password: "123456",
    //     };
    //     const mockReq = { body: mockUser };
    //     const mockRes = {
    //       status: jest.fn().mockReturnThis(),
    //       json: jest.fn(),
    //     };
      
    //     pool.query.mockImplementation((query, values, callback) => {
    //       if (query === queries.checkEmailExists) {
    //         expect(values).toEqual([mockUser.email]);
    //         callback(null, { rows: [{ exists: true }] }); // email already exists
    //       } else {
    //         callback(new Error("Unexpected query"));
    //       }
    //     });
      
    //     createUser(mockReq, mockRes);
      
    //     expect(mockRes.status).toHaveBeenCalledWith(409);
    //     expect(mockRes.json).toHaveBeenCalledWith({ message: "Email already exists" });
    //   });
  });

  describe("updateUser function", () => {
    it("should update an existing user", () => {
      const mockReq = {
        params: { id: "1" },
        body: { name: "bill", email: "bill@test.com" },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn(),
      };
  
      pool.query.mockImplementation((query, values, callback) => {
        if (query === queries.getUserById) {
          expect(values).toEqual([1]);
          callback(null, { rows: [{ id: 1 }] });
        } else if (query === queries.updateUser) {
          expect(values).toEqual(["bill", "bill@test.com", 1]);
          callback(null, { rows: [] });
        } else {
          callback(new Error("Unexpected query"));
        }
      });
  
      updateUser(mockReq, mockRes);
  
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.send).toHaveBeenCalledWith("User updated successfully");
    });
  
    it("should return an error if user does not exist", () => {
      const mockReq = {
        params: { id: "1" },
        body: { name: "bill", email: "bill@test.com" },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      pool.query.mockImplementation((query, values, callback) => {
        if (query === queries.getUserById) {
          expect(values).toEqual([1]);
          callback(null, { rows: [] });
        } else {
          callback(new Error("Unexpected query"));
        }
      });
  
      updateUser(mockReq, mockRes);
  
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: "User does not exist" });
    });
  });

describe("deleteUser function", () => {
    it("should delete an existing user", () => {
      const mockReq = { params: { id: 1 } };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn(),
      };
  
      pool.query.mockImplementation((query, values, callback) => {
        if (query === queries.getUserById) {
          expect(values).toEqual([mockReq.params.id]);
          callback(null, { rows: [{ id: 1 }] }); // User exists
        } else if (query === queries.deleteUser) {
          expect(values).toEqual([mockReq.params.id]);
          callback(null, { rows: [] }); // User deleted successfully
        } else {
          callback(new Error("Unexpected query"));
        }
      });
  
      deleteUser(mockReq, mockRes);
  
      expect(mockRes.status).toHaveBeenCalledWith(204);
      expect(mockRes.send).toHaveBeenCalledWith('User deleted successfully');
    });
  
    it("should not delete a non-existing user", () => {
      const mockReq = { params: { id: 1 } };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      pool.query.mockImplementation((query, values, callback) => {
        if (query === queries.getUserById) {
          expect(values).toEqual([mockReq.params.id]);
          callback(null, { rows: [] }); // User does not exist
        } else {
          callback(new Error("Unexpected query"));
        }
      });
  
      deleteUser(mockReq, mockRes);
  
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: "User does not exist" });
    });
  });
