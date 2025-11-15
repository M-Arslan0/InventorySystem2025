export default function SupplierCards({ totalSuppliers }) {
  const menuItems = [
    {
      title: "Total Suppliers",
      value: totalSuppliers,
      icon: "fas fa-box-open",
      bgColor: "bg-blue"
    },
    {
      title: "Our Due Payments",
      value: "58",
      icon: "fa-regular fa-hourglass-half",
      bgColor: "bg-orange"
    },
    {
      title: "Hold Payments",
      value: "16",
      icon: "fa-solid fa-pen-fancy",
      bgColor: "bg-violet"
    },
    {
      title: "Pending Payments",
      value: "14",
      icon: "fa-solid fa-layer-group",
      bgColor: "bg-green"
    }
  ];

  return (
    <div className="grid grid-cols-4 cursor-pointer w-full">
      {menuItems.map((item, index) => (
        <div key={index}>
          <div className="card transition delay-150 duration-300 ease-in-out hover:translate-y-[-3px]">
            <div className="card-header">
              <div>
                <div className="card-title">{item.title}</div>
                <div className="card-value">{item.value}</div>
              </div>
              <div className={`card-icon ${item.bgColor}`}>
                <i className={item.icon}></i>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
