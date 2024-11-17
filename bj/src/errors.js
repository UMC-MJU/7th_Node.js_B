export class DuplicateUserEmailError extends Error {
    errorCode = "U001";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

export class DuplicateRegionError extends Error {
    errorCode = "U002";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

export class DuplicateUserError extends Error {
    errorCode = "U003";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

export class DuplicatePreferError extends Error {
    errorCode = "U004";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

export class DuplicateReviewError extends Error {
    errorCode = "U005";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

export class DuplicateMemberMissionError extends Error {
    errorCode = "U006";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

export class DuplicateStoreError extends Error {
    errorCode = "U007";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

export class DuplicateStoreReviewError extends Error {
    errorCode = "U008";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

export class DuplicateMemberReviewError extends Error {
    errorCode = "U009";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

export class DuplicateStoreMissionError extends Error {
    errorCode = "U010";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}