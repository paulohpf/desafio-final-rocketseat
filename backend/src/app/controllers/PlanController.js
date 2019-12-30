import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const { count, rows: plans } = await Plan.findAndCountAll({
      order: ['updated_at'],
      attributes: ['id', 'title', 'duration', 'price'],
      limit: 10,
      offset: (page - 1) * 10,
    });

    return res.json({
      offset: (page - 1) * 10,
      totalPages: Math.ceil(count / 10) !== 0 ? Math.ceil(count / 10) : 1,
      rows: plans,
    });
  }

  async getById(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params)))
      return res.status(400).json({ error: 'Validation fails' });

    const { id } = req.params;

    const plan = await Plan.findByPk(id);

    return res.json(plan);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails' });

    const { id, title, duration, price } = await Plan.create(req.body);

    return res.json({
      id,
      title,
      duration,
      price,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      title: Yup.string(),
      duration: Yup.number(),
      price: Yup.number(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails' });

    const { id } = req.body;

    const enrollPlan = await Plan.findByPk(id);

    const existEnrollPlan = await Plan.findOne({
      where: { id },
    });
    if (!existEnrollPlan)
      return res.status(400).json({ error: 'Enroll Plan does not exists' });

    const { title, duration, price } = await enrollPlan.update(req.body);

    return res.json({
      id,
      title,
      duration,
      price,
    });
  }

  /**
   * Criar requisição de DELETE
   */
  async delete(req, res) {
    const enrollPlan = await Plan.findByPk(req.params.id);

    enrollPlan.destroy();

    return res.json({ success: 'The Plan was deleted' });
  }
}

export default new PlanController();
