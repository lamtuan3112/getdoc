const Account = require("../config/database").account;
const Employee = require("../config/database").employee;

exports.create = async (req, res) => {
  let data = req.body;
  try {
    if (!data.email || !data.username || !data.password) {
      return res.status(400).send({
        success: false,
        msg: "thông tin tài khoản không được để trống !",
      });
    }else {
      //tìm kiếm trong database đã tồn tại bản ghi chưa
      const account = await Account.findOne({
        where: { username: data.username },
      });
      if (account) {
        res.status(400).send({
          success: false,
          msg: "tài khoản đã tồn tại!",
        });
      } else {
        const newAccount = await Account.create({
          email: data.email,
          username: data.username,
          password: data.password
        });
        res.status(200).send({
          success: true,
          msg: "Tạo mới tài khoản thành công !",
        });
      }
    }
  } catch (err) {
    throw err;
  }
};


exports.update = async (req, res) => {
  const { email, password} = req.body;
  const account = Account.findByPk(req.params.id).then((account) => {
    account
      .update({
        // nếu sửa thì lấy giá trị email hoặc password, nếu không sửa thì sẽ lấy giá trị ở bản ghi cũ  
        email: email || account.email,
        password: password || account.password
      })
      .then((updateAccount) => {
        res.status(200).send({
          success: true,
          msg: "Cập nhật thành công !",
          data: updateAccount,
        });
      });
  });
};

exports.delete = async (req, res) => {
  let id = req.params.id;
  const account = await Account.destroy({ where: { id: id } });
  if (account) {
    res.status(200).send({
      success: true,
      msg: "Đã xóa tài khoản !",
    });
  } else {
    return res.status(404).send({
      success: false,
      msg: "Xóa tài khoản không thành công !",
    });
  }
};

exports.getAll = async (req, res) => {
  const account = await Account.findAll({
    // order: [["username", "DESC"]],
  });
  if (account) {
    return res.status(200).send({
      success: true,
      msg: "Lấy dữ liệu thành công !",
      data: account,
    });
  } else {
    return res.status(404).send({
      success: false,
      msg: "Không lấy được dữ liệu !",
    });
  }
};

exports.getByid = async (req, res) => {
  let data = req.params.id;
  try {
    let account = await Account.findOne({
      where: {
        id: data,
      },
    });
    if (account) {
      return res.status(200).send({
        success: true,
        msg: "Lấy dữ liệu thành công !",
        data: account,
      });
    } else {
      return res.status(404).send({
        success: false,
        msg: "Không lấy được dữ liệu !",
      });
    }
  } catch (err) {
    throw err;
  }
};

exports.getEmployee = async (req, res) => {
  let account = await Account.findAll({
    order: [["username", "DESC"]],
    include: [
      {
        model: Employee,
        as: "employeeInfo",
        attributes:["name","idNo"]
      },
    ],
  });
  if (account) {
    return res.status(200).send({
      success: true,
      msg: "Lấy dữ liệu thành công !",
      data: account,
    });
  } else {
    return res.status(404).send({
      success: false,
      msg: "Không lấy được dữ liệu !",
    });
  }
};

exports.login = async (req, res) => {
  let data = req.body;
  try {
    if (!data.username || !data.password) {
      return res.status(400).send({
        success: false,
        msg: "vui lòng nhập username và mật khẩu !",
      });
    }else {
      //tìm kiếm trong database đã tồn tại bản ghi chưa
      const account = await Account.findOne({
        where: { username: data.username , password: data.password },
      });
      if (account) {
        res.status(200).send({
          success: true,
          msg: "đăng nhập thành công!",
        });
      } else {
        res.status(400).send({
          success: false,
          msg: "Tài khoản hoặc mật khẩu chưa chính xác !",
        });
      }
    }
  } catch (err) {
    throw err;
  }
};
