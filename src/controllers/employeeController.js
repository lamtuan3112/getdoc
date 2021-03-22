const Sequelize = require("sequelize");
const Employee = require("../config/database").employee;


exports.create = async (req, res) => {
  let data = req.body;
  try {
    if (!data.name || !data.gender || !data.year || !data.idNo || !data.email || !data.adress || !data.position || !data.phone || !data.salary) {
      return res.status(400).send({
        success: false,
        msg: "thông tin nhân viên không được để trống !",
      });
    }else {
      //tìm kiếm trong database đã tồn tại bản ghi chưa
      const employee = await Employee.findOne({
        where: { idNo: data.idNo },
      });
      if (employee) {
        res.status(400).send({
          success: false,
          msg: "nhân viên đã tồn tại!",
        });
      } else {
        const newEmployee = await Employee.create({
          name: data.name,
          gender: data.gender,
          year: data.year,
          idNo: data.idNo,
          email: data.email,
          adress: data.adress,
          position: data.position,
          phone: data.phone,
          salary: data.salary,
        });
        res.status(200).send({
          success: true,
          msg: "Tạo mới nhân viên thành công !",
        });
      }
    }
  } catch (err) {
    throw err;
  }
};


exports.update = async (req, res) => {
  const {name,gender,year,idNo,email,adress,position,phone,salary } = req.body;
  const employee = Employee.findByPk(req.params.id).then((employee) => {
    employee
      .update({
        // nếu sửa thì lấy giá trị name hoặc price, nếu không sửa thì sẽ lấy giá trị ở bản ghi cũ product.name 
        name: name || employee.name,
        gender: gender || employee.gender,
        year: year || employee.year,
        idNo: idNo || employee.idNo,
        email: email || employee.email,
        adress: adress || employee.adress,
        position: position || employee.position,
        phone: phone || employee.phone,
        salary: salary || employee.salary,
      })
      .then((updateEmployee) => {
        res.status(200).send({
          success: true,
          msg: "Cập nhật thành công !",
          data: updateEmployee,
        });
      });
  });
};

exports.delete = async (req, res) => {
  let id = req.params.id;
  const employee = await Employee.destroy({ where: { id: id } });
  if (employee) {
    res.status(200).send({
      success: true,
      msg: "Đã xóa nhân viên !",
    });
  } else {
    return res.status(404).send({
      success: false,
      msg: "Xóa nhân viên không thành công !",
    });
  }
};

exports.getAll = async (req, res) => {
  const employee = await Employee.findAll({
    order: [["name", "DESC"]],
  });
  if (employee) {
    return res.status(200).send({
      success: true,
      msg: "Lấy dữ liệu thành công !",
      data: employee,
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
    let employee = await Employee.findOne({
      where: {
        id: data,
      },
    });
    if (employee) {
      return res.status(200).send({
        success: true,
        msg: "Lấy dữ liệu thành công !",
        data: employee,
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
  const employee = await Employee.findAll({ where:{name:{[Op.like]:`%${name}%`}} });
  if (employee) {
    res.status(200).send({
      success: true,
      msg: "tim kiem thanh cong",
      data: employee
    });
  } else {
    return res.status(404).send({
      success: false,
      msg: "tim kiem không thành công !",
    });
  }
};

