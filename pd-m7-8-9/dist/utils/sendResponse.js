export const sendResponse = (res, data) => {
    res.status(data.statusCode).json({
        success: data.success,
        message: data.message,
        data: data.data,
        error: data.error,
        author: data.author
    });
};
//# sourceMappingURL=sendResponse.js.map