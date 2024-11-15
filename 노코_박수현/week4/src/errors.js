export class DuplicateUserEmailError extends Error {
    errorCode = "U001";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

export class NoBodyStoreError extends Error {
    errorCode = "U002";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

export class AlreadyChallengingError extends Error {
    errorCode = "U003";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

export class NoBodyRegionError extends Error {
    errorCode = "U004";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

export class SameMissionError extends Error {
    errorCode = "U005";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

export class NoBodyMemberOrTermsError extends Error {
    errorCode = "U006";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

export class NobodyGetValuesError extends Error {
    errorCode = "U007";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}