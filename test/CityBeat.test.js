// const {
//   time,
//   loadFixture,
// } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
// const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("Contracts", () => {
  let contract, result;

  const taxPct = 5;

  const id = 11;

  //user
  const firstName = "Cipher";
  const lastNme = "X";
  const userName = "CipherX";
  const email = "cipherX@Cipher.com";
  const password = "<PASSWORD>";
  const phone = "9876543210";

  //event
  const name = "Diversion";
  const description = "Diversion 2k24";
  const image = "IMAGE";
  const location = "Kolkata";
  const amount = 3721;

  beforeEach(async () => {
    // const hardhatToken = await ethers.deployContract("Token");

    [owner] = await ethers.getSigners();
    contract = await ethers.deployContract("CityBeat");
    await contract.waitForDeployment();
  });

  describe("Event", () => {
    beforeEach(async () => {
      await contract
        .connect(owner)
        .createEvent(name, description, image, location, amount);

    });

    describe("Success", () => {
      it("Should confirm event creation", async () => {

        result = await contract.getEvents();
        console.log(result);
        // expect(result).to.have.lengthOf(1);

        result = await contract.connect(owner).getEvent(id);
        // expect(result.name).to.be.equal(name);
        // expect(result.description).to.be.equal(description);
        // expect("AC").to.be.equal("AC");
      });

      // it("Should confirm event update", async () => {
      //   result = await contract.getEvent(id);
      //   expect(result.name).to.be.equal(name);
      //   expect(result.amount).to.be.equal(amount);
      //   const newName = "My Second Charity";
      //   const newAmount = 2.5;
      //   await contract
      //     .connect(owner)
      //     .updateEvent(id, name, description, image, location, amount);
      //   result = await contract.getEvent(id);
      //   expect(result.name).to.be.equal(newName);
      //   expect(result.amount).to.be.equal(newAmount);
      // });

      // it("Should confirm event deletion", async () => {
      //   result = await contract.getEvents();
      //   expect(result).to.have.lengthOf(1);
      //   result = await contract.getevent(id);
      //   expect(result.deleted).to.be.equal(false);
      //   await contract.connect(owner).deleteEvent(id);
      //   result = await contract.getEvents();
      //   expect(result).to.have.lengthOf(0);
      //   result = await contract.getEvent(id);
      //   expect(result.deleted).to.be.equal(true);
      // });

      // it("Should confirm event status", async () => {
      //   result = await contract.getEvents();
      //   expect(result).to.have.lengthOf(1);
      //   result = await contract.getEvent(id);
      //   expect(result.banned).to.be.equal(false);
      //   await contract.toggleBan(id);
      //   result = await contract.getEvents();
      //   expect(result).to.have.lengthOf(0);
      //   result = await contract.getEvent(id);
      //   expect(result.banned).to.be.equal(true);
      // });
    });

    describe("Failures", () => {
      it("Should confirm event creation failures", async () => {
        await expect(
          contract
            .connect(owner)
            .createEvent("", description, image, location, amount)
        ).to.be.revertedWith("Name cannot be empty");

        await expect(
          contract
            .connect(owner)
            .createEvent(name, description, image, location, 0)
        ).to.be.revertedWith("Amount cannot be zero");
      });

      it("Should confirm event update failures", async () => {
        await expect(
          contract
            .connect(owner)
            .updateEvent(100, name, description, image, location, amount)
        ).to.be.revertedWith("Event Not Found");

        // await expect(
        //   contract.updateEvent(id, name, description, image, location, amount)
        // ).to.be.revertedWith("Unauthorized Entity");
      });

      // it("Should confirm charity banning failures", async () => {
      //   await expect(contract.connect(owner).toggleBan(id)).to.be.revertedWith(
      //     "Ownable: caller is not the owner"
      //   );
      // });
    });
  })

  describe("User", () => {
    // beforeEach(async () => {
    //   await contract.connect(owner).createUser(firstName, lastNme, userName, email, password, phone);
    // });

    // describe("Success", () => {
    //   it("Should confirm user creation", async () => {
    //     result = await contract.getUsers();
    //     expect(result).to.have.lengthOf(1);

    //     // result = await contract.connect(owner).getUser();
    //     // expect(result.firstName).to.be.equal(firstName);
    //     // expect(result.lastName).to.be.equal(lastNme);
    //     // expect(result.userName).to.be.equal(userName);
    //     // expect(result.email).to.be.equal(email);
    //     // expect(result.phone).to.be.equal(phone);
    //   })
    // })

    // describe("Failures", () => {
    //   it("Should confirm user creation failures", async () => {
    //     await expect(
    //       contract
    //        .connect(owner)
    //        .createUser("", lastNme, userName, email, password, phone)
    //     ).to.be.revertedWith("First Name cannot be empty");

    //     await expect(
    //       contract
    //        .connect(owner)
    //        .createUser(firstName, lastNme, userName, email, password, "")
    //     ).to.be.revertedWith("Phone cannot be empty");

    //     await expect(
    //       contract
    //        .connect(owner)
    //        .createUser(firstName, lastNme, userName, email, "", phone)
    //     ).to.be.revertedWith("Password cannot be empty");
    //   })
    // })
  })

});