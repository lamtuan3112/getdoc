const Contract = require("../config/database").contract;
const Employee = require("../config/database").employee;
const User = require("../config/database").user;


exports.create = async (req, res) => {
  let data = req.body;
  try {
    if (!data.userId || !data.year || !data.address || !data.service || !data.phone || !data.price  || !data.employeeId || !data.date) {
      return res.status(400).send({
        success: false,
        msg: "thông tin hợp đồng không được để trống !",
      });
    }else {
        const newContract = await Contract.create({
          userId: data.userId,
          year: data.year,
          address: data.address,
          service: data.service,
          phone: data.phone,
          price: data.price,
          employeeId: data.employeeId,
          date: data.date,
        });
        res.status(200).send({
          success: true,
          msg: "Tạo mới hợp đồng thành công !",
        });
      }
    
  } catch (err) {
    throw err;
  }
};


exports.update = async (req, res) => {
  const { userId, year,address,service,phone,price,date} = req.body;
  const contract = Contract.findByPk(req.params.id).then((contract) => {
    contract
      .update({
        // nếu sửa thì lấy giá trị name hoặc price, nếu không sửa thì sẽ lấy giá trị ở bản ghi cũ Contract.name 
        userId: userId || contract.userId,
        price: year || contract.year,
        address: address || contract.address,
        service: service || contract.service,
        phone: phone || contract.phone,
        price: price || contract.price,
        employeeId: employeeId || contract.employeeId,
        date: date || contract.date,
      })
      .then((updateContract) => {
        res.status(200).send({
          success: true,
          msg: "Cập nhật thành công !",
          data: updateContract,
        });
      });
  });
};

exports.delete = async (req, res) => {
  let id = req.params.id;
  const contract = await Contract.destroy({ where: { id: id } });
  if (contract) {
    res.status(200).send({
      success: true,
      msg: "Đã xóa hợp đồng !",
    });
  } else {
    return res.status(404).send({
      success: false,
      msg: "Xóa hợp đồng không thành công !",
    });
  }
};

exports.getAll = async (req, res) => {
  const contract = await Contract.findAll({
    order: [["userId", "DESC"]],
  });
  if (contract) {
    return res.status(200).send({
      success: true,
      msg: "Lấy dữ liệu thành công !",
      data: contract,
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
    let contract = await Contract.findOne({
      where: {
        id: data,
      },
    });
    if (contract) {
      return res.status(200).send({
        success: true,
        msg: "Lấy dữ liệu thành công !",
        data: contract,
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
  let contract = await Contract.findAll({
    order: [["userId", "DESC"]],
    include: [
      {
        model: Employee,
        as: "employeeInfo",
        attributes:["name","idNo"]
      },
    ],
  });
  if (contract) {
    return res.status(200).send({
      success: true,
      msg: "Lấy dữ liệu thành công !",
      data: contract,
    });
  } else {
    return res.status(404).send({
      success: false,
      msg: "Không lấy được dữ liệu !",
    });
  }
};

exports.getUser = async (req, res) => {
  let contract = await Contract.findAll({
    order: [["userId", "DESC"]],
    include: [
      {
        model: User,
        as: "userInfo",
        attributes:["name","idNo"]
      },
    ],
  });
  if (contract) {
    return res.status(200).send({
      success: true,
      msg: "Lấy dữ liệu thành công !",
      data: contract,
    });
  } else {
    return res.status(404).send({
      success: false,
      msg: "Không lấy được dữ liệu !",
    });
  }
};

exports.getRevenue = async (req, res) => {
  let contract = await Contract.sum('price');
  if (contract) {
    return res.status(200).send({
      success: true,
      msg: "Lấy dữ liệu thành công !",
      data: contract,
    });
  } else {
    return res.status(404).send({
      success: false,
      msg: "Không lấy được dữ liệu !",
    });
  }
};