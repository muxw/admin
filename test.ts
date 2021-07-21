interface Person {
  name: string;
  age: 18;
  sex: 0;
}
type o1 = Omit<Person, 'sex'>;
