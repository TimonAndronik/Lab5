export class User {
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  position: string;
  photo = "https://via.placeholder.com/150";
  hobbies: string[];

  constructor(
    firstName: string,
    lastName: string,
    gender: string,
    age: number,
    position: string,
    hobbies: string[]
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.age = age;
    this.position = position;
    this.photo = "https://via.placeholder.com/150";
    this.hobbies = hobbies;
  }
}
