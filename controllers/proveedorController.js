const Proveedor = require('../models/Proveedor');

//funcion agregar proveedores
exports.agregarProvedores = async (req, res) => {

    try {
        let proveedor;
        proveedor = new Proveedor(req.body);
        await proveedor.save();
        res.json({msg:'Registro agregado exitosamente!', proveedor});

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al agregar proveedor');
    }
}

//funcion buscar proveedores 
exports.buscarProveedores = async (req, res) => {

    try {

        let proveedor = await Proveedor.find();
        res.json(proveedor);
        return

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al buscar el proveedor');
        return
    }
}

//funcion buscar por ID (busqueda individual)
exports.buscarProveedorPorId = async (req, res) => {

    try {
        let proveedor = await Proveedor.findById(req.params.id);
        if (!proveedor) {
            res.status(404).json({ msg: 'proveedor no encontrado' });
            return

        } else {
            res.send(proveedor);
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('ID de proveedor no encontrado');
        return
    }
}

//funcion editar registro
exports.editarProveedor = async (req, res) => {

    try {
        let proveedor = await Proveedor.findOneAndUpdate({_id: req.params.id},req.body);
        if (!proveedor) {
            res.status(404).json({ msg: 'proveedor no eocontrado' });
        } else { 
            proveedor = await Proveedor.findById(req.params.id);
            res.json({msg: 'proveedor modificado', proveedor});
            return
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al editar registro');
    }
}

//funcion eliminar registro
exports.eliminarProveedor = async (req, res) => {

    try {
        let proveedor = await Proveedor.findById(req.params.id);
        if (!proveedor) {
            res.status(404).json({ msg: 'proveedor no eocontrado' });
            return
        } else {
            await Proveedor.findOneAndDelete({ _id: req.params.id });
            res.send({ msg: 'registro eliminado' });
            return
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar rl registro');
    }
}