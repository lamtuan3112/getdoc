const Sequelize = require("sequelize");
const User = require("../config/database").user;

exports.create = async (req, res) => {
  let data = req.body;
  try {
    if (!data.name || !data.gender || !data.year || !data.idNo || !data.email || !data.adress || !data.phone) {
      return res.status(400).send({
        success: false,
        msg: "thông tin khách hàng không được để trống !",
      });
    }else {
      //tìm kiếm trong database đã tồn tại bản ghi chưa
      const user = await User.findOne({
        where: { idNo: data.idNo },
      });
      if (user) {
        res.status(400).send({
          success: false,
          msg: "khach hang đã tồn tại!",
        });
      } else {
        const newUser = await User.create({
          name: data.name,
          gender: data.gender,
          year: data.year,
          idNo: data.idNo,
          email: data.email,
          adress: data.adress,
          phone: data.phone,
        });
        res.status(200).send({
          success: true,
          msg: "Tạo mới khach hang thành công !",
        });
      }
    }
  } catch (err) {
    throw err;
  }
};


exports.update = async (req, res) => {
  const {name,gender,year,idNo,email,adress,phone } = req.body;
  const user = User.findByPk(req.params.id).then((user) => {
    user
      .update({
        // nếu sửa thì lấy giá trị name hoặc price, nếu không sửa thì sẽ lấy giá trị ở bản ghi cũ product.name 
        name: name || employee.name,
        gender: gender || employee.gender,
        year: year || employee.year,
        idNo: idNo || employee.idNo,
        email: email || employee.email,
        adress: adress || employee.adress,
        phone: phone || employee.phone,
      })
      .then((updateUser) => {
        res.status(200).send({
          success: true,
          msg: "Cập nhật thành công !",
          data: updateUser,
        });
      });
  });
};

exports.delete = async (req, res) => {
  let id = req.params.id;
  const user = await User.destroy({ where: { id: id } });
  if (user) {
    res.status(200).send({
      success: true,
      msg: "Đã xóa khach hang !",
    });
  } else {
    return res.status(404).send({
      success: false,
      msg: "Xóa khach hang không thành công !",
    });
  }
};

exports.getAll = async (req, res) => {
  const user = await User.findAll({
    order: [["name", "DESC"]],
  });
  if (user) {
    return res.status(200).send({
      success: true,
      msg: "Lấy dữ liệu thành công !",
      data: user,
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
    let user = await User.findOne({
      where: {
        id: data,
      },
    });
    if (user) {
      return res.status(200).send({
        success: true,
        msg: "Lấy dữ liệu thành công !",
        data: user,
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

exports.search = async (req, res) => {
  const Op = Sequelize.Op;
  let name = req.params.name;
  const user = await User.findAll({ where:{name:{[Op.like]:`%${name}%`}} });
  if (user) {
    res.status(200).send({
      success: true,
      msg: "tim kiem thanh cong",
      data: user
    });
  } else {
    return res.status(404).send({
      success: false,
      msg: "tim kiem không thành công !",
    });
  }
};