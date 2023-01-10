interface IUpdateOffer {
  id?:Number
  title?: String;
  offerType?: String;
  offerStatus?: String;
  profile?: String;
  ville?: String;
  education?: String;
  description?: String;
  salary?: Number;

  // image?: String;
}

export { IUpdateOffer };
