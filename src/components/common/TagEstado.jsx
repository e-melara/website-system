import { Tag } from "antd";
import {
  CoffeeOutlined,
  CheckOutlined,
  FieldTimeOutlined,
  CloseCircleOutlined,
  CloudUploadOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";

const statusMap = {
  A: (
    <Tag color="geekblue" icon={<CoffeeOutlined />}>
      Iniciando
    </Tag>
  ),
  P: (
    <Tag color="magenta" icon={<FieldTimeOutlined />}>
      Pendiente
    </Tag>
  ),
  V: (
    <Tag color="volcano" icon={<DollarCircleOutlined />}>
      Colecturia
    </Tag>
  ),
};

export const StatusTag = ({ status }) => statusMap[status];

const asesoriaStatusMap = {
  D: (
    <Tag color="red" icon={<CloseCircleOutlined />}>
      Denegada
    </Tag>
  ),
  A: (
    <Tag color="blue" icon={<CheckOutlined />}>
      Aceptada
    </Tag>
  ),
  I: (
    <Tag color="volcano" icon={<CloudUploadOutlined />}>
      Inicianda
    </Tag>
  ),
};

export const StatusTagAsesoria = ({ status }) => asesoriaStatusMap[status];
