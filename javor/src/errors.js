//이메일 중복에러
export class DuplicateUserEmailError extends Error {
    errorCode = "U001";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

// 미션 중복에러
export class DuplicateUserMissionError extends Error {
    errorCode = "U002";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

// 미션이 없을 때 에러
export class NotFoundUserMissionError extends Error {
    errorCode = "U003"

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

// 리뷰가 없을 때 에러
export class NotFoundUserReviewError extends Error {
    errorCode = "U004";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

// 이미 종료된 미션일 때 에러
/*
export class AlreadyCompleteMissionError extends Error {
    errorCode = "U005";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}
    */

// 지역이 없을 때 에러
export class NotFoundStoreRegionError extends Error {
    errorCode = "U006";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

//가게가 없을 때 에러
export class NoStoreError extends Error {
    errorCode = "U007";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

//정보를 불러올 수 없을 때 에러
export class getNoValueError extends Error {
    errorCode = "U008";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}
