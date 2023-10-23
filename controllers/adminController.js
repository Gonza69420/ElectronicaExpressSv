const {Machine} = require("../models/machine");
const { User , Role } = require("../models/user");

exports.addMachine = async (req, res) => {
    try{
        const newMachine = new Machine();

        const savedMachine = await newMachine.save();

        res.status(201).json({message : "Machine added successfully"}, savedMachine);
    } catch(err){
        res.status(500).json({error : err.message});
    }
};

exports.deleteMachine = async (req, res) => {
    try{
        const {machineId } = req.params;

        const result = await Machine.findOneAndRemove({_id : machineId});

        if (!result){
            return res.status(404).json({error : "Machine not found"});
        }

        res.status(200).json({message : "Machine deleted successfully"});
    } catch(err){
        res.status(500).json({error : err.message});
    }
};

exports.getIncome = async (req, res) => {
    try{
        const {machineId} = req.params;

        const machine = await Machine.findOne({_id : machineId});

        if (!machine){
            return res.status(404).json({error : "Machine not found"});
        }

        const income = machine.income;

        res.status(200).json({ income});
    } catch(err){
        res.status(500).json({error : err.message});
    }
}

exports.getAllMachines = async (req, res) => {
    try{
        const machines = await Machine.find({});

        res.status(200).json({machines});
    } catch(err){
        res.status(500).json({error : err.message});
    }
}

exports.addMaintenanceStaff = async (req, res) => {
    try {
        const { username, password , name} = req.body;

        const role = await Role.findOne({ name : 'Maintenance' });

        if (!role) {
            return res.status(400).json({ message: 'Role not found' });
        }

        const user = new User({
            username,
            password,
            name,
            role: role._id,
        });

        await user.save();

        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error creating the user', error });
    }
}


exports.deleteMaintenanceStaff = async (req, res) => {
    try{
        const {maintenanceId } = req.params

        const result = await User.findOneAndRemove({_id : maintenanceId});

        if (!result){
            return res.status(404).json({error : "Maintenance not found"});
        }

        res.status(200).json({message : "Maintenance deleted successfully"});
    } catch(err){
        res.status(500).json({error : err.message});
    }
}


exports.getMachine = async (req, res) => {
    try{
        const {machineId} = req.params;

        const machine = await Machine.findOne({_id : machineId});

        if (!machine){
            return res.status(404).json({error : "Machine not found"});
        }

        res.status(200).json({machine});

    } catch(err){
        res.status(500).json({error : err.message});
    }
}

exports.getTotalIncome = async (req, res) => {
    try {
        // Utiliza la función `find` para obtener todos los documentos de Machine
        const machines = await Machine.find({}, 'income'); // Proyecta solo el campo 'income'

        const totalIncome = machines.reduce((total, machine) => total + machine.income, 0);

        res.status(200).json({ totalIncome });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el ingreso de las máquinas', error });
    }
}
