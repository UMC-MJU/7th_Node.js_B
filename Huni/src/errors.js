export class DuplicateUserEmailError extends Error {
    errorCode = "U001";
  
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }

  //존재하지 않는 유저입니다.
  export class DuplicateUserError extends Error{
    errorCode = "User null";

    constructor(reason, data){
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }

  //없는 가게입니다.
  export class DuplicateStoreError extends Error{
    errorCode = "Store null";

    constructor(reason, data){
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }

  //없는 선호입니다.
  export class DuplicatePreferError extends Error{
    errorCode = "prefer null";

    constructor(reason, data){
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }

  export class DuplicateUpdateError extends Error {
    errorCode = "U011";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}