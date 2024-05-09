const Cliente = require('../models/Cliente');

//funcion agregar clientes
exports.agregarClientes = async (req, res) => {

    try {
        let cliente;
        cliente = new Cliente(req.body);
        await cliente.save();
        res.send(cliente);

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al agregar clientes');
    }
}

//funcion buscar cliente 
exports.buscarClientes = async (req, res) => {

    try {

        let cliente = await Cliente.find();
        res.json(cliente);
        return

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al buscar el cliente');
        return
    }
}

//funcion buscar por ID (busqueda individual)
exports.buscarPorId = async (req, res) => {

    try {
        let cliente = await Cliente.findById(req.params.id);
        if (!cliente) {
            res.status(404).json({ msg: 'cliente no eocontrado' });
            return

        } else {
            res.send(cliente);
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('ID no encontrado');
        return
    }
}

//funcion editar registro
exports.editarCliente = async (req, res) => {

    try {
        let cliente = await Cliente.findOneAndUpdate({_id: req.params.id},req.body);
        if (!cliente) {
            res.status(404).json({ msg: 'cliente no eocontrado' });
        } else { 
            cliente = await Cliente.findById(req.params.id);
            res.json({msg: 'cliente modificado', cliente});
            return
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al editar registro');
    }
}

//funcion eliminar registro
exports.eliminarCliente = async (req, res) => {

    try {
        let cliente = await Cliente.findById(req.params.id);
        if (!cliente) {
            res.status(404).json({ msg: 'cliente no encontrado' });
            return
        } else {
            await Cliente.findOneAndDelete({ _id: req.params.id });
            res.send({ msg: 'registro eliminado' });
            return
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar rl registro');
    }
}

