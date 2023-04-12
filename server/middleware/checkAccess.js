const checkAccess = (permission) => {
  return async (req, res, next) => {
    if (permission.roles.includes(req.user?.role)) return next();
    if (!permission?.owner)
      return res
        .status(401)
        .json({ success: false, message: 'Доступ запрещен!' });
    const isOwner = await permission.owner(req);
    if (isOwner === true) return next();
    if (isOwner === false)
      return res
        .status(401)
        .json({ success: false, message: 'Доступ запрещен!' });
    res.status(500).json({
      success: false,
      message: 'Что-то пошло не так! Повторите попытку позже',
    });
  };
};

export default checkAccess;
