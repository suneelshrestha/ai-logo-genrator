export default interface formdataInterface {
  title: string;
  desc?: string;
  color?: string;
  style?: string;
  design?: string;
  ideas?: string;
}

export type ChildProps = (label: string, value: string) => void;

export default interface userFormdata {
  name: string;
  email: string;
  password: string;
}

export default interface userLogin {
  email: string;
  password: string;
}
