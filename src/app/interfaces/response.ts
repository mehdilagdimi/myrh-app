interface Response<T> {
  date: String;
  data:{
    data: T;
  }
  status: Number;
  responseStatus: String;
  message: String;
}
interface ResponseTwo<T> {
  date: String;
  data:Map<String, Object>;
  status: Number;
  responseStatus: String;
  message: String;
}


export { Response,  ResponseTwo};
