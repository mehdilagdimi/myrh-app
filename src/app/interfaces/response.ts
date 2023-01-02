interface Response<T> {
  date: String;
  data:{
    data: T;
  }
  status: Number;
  responseStatus: string;
  message: String;
}


export { Response };
