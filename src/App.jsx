import { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";
import {
  actionItems,
  kpiSummary,
  salesTrend,
  topProducts,
  stationList,
  productList,
  productFormDefaults,
  salesAnalytics,
} from "./data/mockData";
import "./App.css";

const menuItems = [
  { id: "overview", label: "메인 대시보드", shortLabel: "메인" },
  { id: "stations", label: "스테이션 관리", shortLabel: "지점" },
  { id: "products", label: "상품 관리", shortLabel: "상품" },
  { id: "sales", label: "매출 분석", shortLabel: "매출" },
];

const analyticsRanges = [
  { id: "daily", label: "일별" },
  { id: "weekly", label: "주별" },
  { id: "monthly", label: "월별" },
];

function App() {
  const [activeMenu, setActiveMenu] = useState("overview");
  const [selectedStation, setSelectedStation] = useState(stationList[0]);
  const [productForm, setProductForm] = useState(productFormDefaults);
  const [isProductModalOpen, setProductModalOpen] = useState(false);
  const [productModalMode, setProductModalMode] = useState("create");
  const [productDetail, setProductDetail] = useState(null);
  const [expandedStationId, setExpandedStationId] = useState(null);
  const [expandedProductId, setExpandedProductId] = useState(null);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [analyticsRange, setAnalyticsRange] = useState("weekly");

  const analyticsData = salesAnalytics[analyticsRange];

  const lowInventoryCount = useMemo(
    () => stationList.filter((station) => station.inventory < 20).length,
    []
  );

  const offlineCount = useMemo(
    () => stationList.filter((station) => station.status === "offline").length,
    []
  );

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  const handleProductFormChange = (event) => {
    const { name, value } = event.target;
    setProductForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    setProductForm((prev) => ({ ...prev, image: file ? file.name : null }));
  };

  const toggleStationCard = (stationId) => {
    setExpandedStationId((prev) => (prev === stationId ? null : stationId));
  };

  const toggleProductCard = (productId) => {
    setExpandedProductId((prev) => (prev === productId ? null : productId));
  };

  const openProductDetail = (product) => {
    setProductDetail(product);
  };

  const closeProductDetail = () => {
    setProductDetail(null);
  };

  const openProductModal = (mode, product) => {
    setProductModalMode(mode);
    setProductForm(
      product ? { ...productFormDefaults, ...product } : productFormDefaults
    );
    setProductModalOpen(true);
  };

  const closeProductModal = () => {
    setProductModalOpen(false);
    setProductForm(productFormDefaults);
  };

  const handleProductSubmit = (event) => {
    event.preventDefault();
    // Placeholder logic – in production this would call an API.
    alert(`${productForm.name || "새 상품"} 정보가 저장되었습니다.`);
    closeProductModal();
  };

  const renderOverview = () => (
    <>
      <section className="section">
        <div className="section-header">
          <div>
            <p className="eyebrow">긴급 알림</p>
            <h2>Action Items</h2>
          </div>
          <span className="chip ghost">실시간 동기화</span>
        </div>
        <div className="card-grid two-columns">
          {actionItems.map((item) => (
            <div key={item.id} className={`card action-card ${item.severity}`}>
              <div className="card-header">
                <p className="eyebrow">{item.title}</p>
                <span className="severity-dot" />
              </div>
              <h3>{item.value}</h3>
              <p>{item.description}</p>
              <button className="text-button">목록으로 이동</button>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <p className="eyebrow">핵심 성과 지표</p>
            <h2>KPI Snapshot</h2>
          </div>
          <span className="chip neutral">업데이트: 5분 전</span>
        </div>
        <div className="card-grid three-columns">
          {kpiSummary.map((kpi) => (
            <div key={kpi.id} className="card kpi-card">
              <p className="eyebrow">{kpi.label}</p>
              <div className="kpi-value">
                <h3>{kpi.value}</h3>
                {kpi.delta && (
                  <span className="chip positive">{kpi.delta}</span>
                )}
              </div>
              <p className="subtext">{kpi.subLabel}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section stacked">
        <div className="card trend-card">
          <div className="section-header">
            <div>
              <p className="eyebrow">매출 확인</p>
              <h2>최근 7일 매출 추이</h2>
            </div>
            <span className="chip neutral">단위: 만원</span>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={salesTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" tick={{ fill: "#475569" }} />
                <YAxis tick={{ fill: "#475569" }} />
                <Tooltip formatter={(val) => `${val} 만원`} />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card top-products-card">
          <div className="section-header">
            <div>
              <p className="eyebrow">인기 상품 Top 5</p>
              <h2>판매량 기준</h2>
            </div>
            <span className="chip neutral">최근 30일</span>
          </div>
          <ul className="top-product-list">
            {topProducts.map((product) => (
              <li key={product.rank}>
                <span className="rank">{product.rank}</span>
                <div>
                  <p className="product-name">{product.name}</p>
                  <p className="subtext">{product.supplier}</p>
                </div>
                <strong>{product.sales}</strong>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );

  const renderStations = () => (
    <section className="section">
      <div className="section-header">
        <div>
          <p className="eyebrow">전국 스테이션 현황</p>
          <h2>Station Management</h2>
        </div>
        <div className="chip-row">
          <span className="chip critical">
            재고 20% 미만 {lowInventoryCount}곳
          </span>
          <span className="chip warning">오프라인 {offlineCount}곳</span>
        </div>
      </div>
      <div className="station-layout">
        <div className="station-table-wrapper">
          <table className="station-table">
            <thead>
              <tr>
                <th>스테이션 ID</th>
                <th>설치 위치</th>
                <th>상태</th>
                <th>현재 재고</th>
                <th>리필 필요 품목</th>
                <th>최근 점검일</th>
              </tr>
            </thead>
            <tbody>
              {stationList.map((station) => (
                <tr
                  key={station.id}
                  className={`${
                    station.inventory < 20 ? "low-inventory" : ""
                  } ${selectedStation?.id === station.id ? "selected" : ""}`}
                  onClick={() => setSelectedStation(station)}
                >
                  <td>{station.id}</td>
                  <td>
                    <strong>{station.partner}</strong>
                    <p className="subtext">{station.location}</p>
                  </td>
                  <td>
                    <span className={`status-dot ${station.status}`} />
                    {station.status === "online" ? "온라인" : "오프라인"}
                  </td>
                  <td>{station.inventory}%</td>
                  <td>{station.refillItem}</td>
                  <td>{station.lastInspection}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="station-card-list">
          {stationList.map((station) => {
            const isExpanded = expandedStationId === station.id;
            return (
              <div key={station.id} className={`station-card ${isExpanded ? "expanded" : ""}`}>
                <button
                  type="button"
                  className="station-card-header"
                  onClick={() => toggleStationCard(station.id)}
                >
                  <div>
                    <p className="eyebrow">{station.id}</p>
                    <h3>{station.partner}</h3>
                    <p className="subtext">{station.location}</p>
                  </div>
                  <div className="station-card-meta">
                    <span className={`status-dot ${station.status}`} />
                    <span>{station.status === "online" ? "온라인" : "오프라인"}</span>
                    <span className={`chip ${station.inventory < 20 ? "critical" : "ghost"}`}>
                      재고 {station.inventory}%
                    </span>
                  </div>
                </button>
                {isExpanded && (
                  <div className="station-card-body">
                    <p>
                      <strong>리필 필요:</strong> {station.refillItem}
                    </p>
                    <p>
                      <strong>최근 점검:</strong> {station.lastInspection}
                    </p>
                    <p className="subtext">{station.address}</p>
                    <p className="subtext">담당자: {station.contact}</p>
                    <div className="mobile-inline-grid">
                      <div>
                        <h4>디스펜서</h4>
                        <ul className="mini-list">
                          {station.dispensers.map((item) => (
                            <li key={item.slot}>
                              <span>{item.slot}</span>
                              <p>{item.product}</p>
                              <strong>{item.percent}%</strong>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4>최근 매출</h4>
                        <ul className="mini-list">
                          {station.recentSales.map((sale) => (
                            <li key={`${station.id}-${sale.time}-${sale.product}`}>
                              <span>{sale.time}</span>
                              <p>{sale.product}</p>
                              <strong>{sale.amount}</strong>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {selectedStation && (
          <div className="station-detail card">
            <p className="eyebrow">스테이션 상세</p>
            <h3>{selectedStation.partner}</h3>
            <p className="subtext">{selectedStation.address}</p>
            <p className="subtext">담당자: {selectedStation.contact}</p>

            <div className="detail-block">
              <h4>디스펜서별 재고</h4>
              <ul className="dispenser-list">
                {selectedStation.dispensers.map((item) => (
                  <li key={item.slot}>
                    <span>{item.slot}</span>
                    <div>
                      <p>{item.product}</p>
                      <div className="progress">
                        <div
                          className={`progress-bar ${
                            item.percent < 20 ? "critical" : ""
                          }`}
                          style={{ width: `${item.percent}%` }}
                        />
                      </div>
                    </div>
                    <strong>{item.percent}%</strong>
                  </li>
                ))}
              </ul>
            </div>

            <div className="detail-block inline">
              <div>
                <h4>최근 매출</h4>
                <ul className="mini-list">
                  {selectedStation.recentSales.map((sale) => (
                    <li key={`${sale.time}-${sale.product}`}>
                      <span>{sale.time}</span>
                      <p>{sale.product}</p>
                      <strong>{sale.amount}</strong>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4>점검 로그</h4>
                <ul className="mini-list">
                  {selectedStation.maintenanceLogs.map((log) => (
                    <li key={`${log.date}-${log.note}`}>
                      <span>{log.date}</span>
                      <p>{log.note}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );

  const renderProducts = () => (
    <section className="section">
      <div className="section-header">
        <div>
          <p className="eyebrow">클릭하여 상세 정보 확인</p>
          <h2>Product Management</h2>
        </div>
        <div className="section-actions">
          <button
            type="button"
            className="primary-button"
            onClick={() => openProductModal("create")}
          >
            상품 추가
          </button>
        </div>
      </div>

      <div className="product-layout">
        <div className="product-table card">
          <table>
            <thead>
              <tr>
                <th>상품 ID</th>
                <th>상품명</th>
                <th>공급처</th>
                <th>카테고리</th>
                <th>단가 (원/g)</th>
                <th>상태</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {productList.map((product) => (
                <tr
                  key={product.id}
                  onClick={() => openProductDetail(product)}
                  className="product-row"
                >
                  <td>{product.id}</td>
                  <td>
                    <strong>{product.name}</strong>
                    <p className="subtext">{product.hygieneInfo}</p>
                  </td>
                  <td>{product.supplier}</td>
                  <td>{product.category}</td>
                  <td>{product.unitPrice}</td>
                  <td>
                    <span
                      className={`chip ${
                        product.status === "판매 중" ? "positive" : "ghost"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="ghost-button small"
                      onClick={(event) => {
                        event.stopPropagation();
                        openProductModal("edit", product);
                      }}
                    >
                      수정
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="product-card-list">
        {productList.map((product) => {
          const isExpanded = expandedProductId === product.id;
          return (
            <div key={product.id} className={`product-card ${isExpanded ? "expanded" : ""}`}>
              <button
                type="button"
                className="product-card-header"
                onClick={() => toggleProductCard(product.id)}
              >
                <div>
                  <h3>{product.name}</h3>
                  <p className="subtext">{product.supplier}</p>
                </div>
                <div className="product-card-meta">
                  <span className="chip neutral">{product.category}</span>
                  <span className="chip ghost">{product.status}</span>
                </div>
              </button>
              {isExpanded && (
                <div className="product-card-body">
                  <img
                    src={product.image}
                    alt={`${product.name} 이미지`}
                    className="product-card-image"
                  />
                  <p>
                    <strong>단가:</strong> {product.unitPrice}원/g
                  </p>
                  <p>
                    <strong>위생/정보:</strong> {product.hygieneInfo}
                  </p>
                  <p>
                    <strong>최근 소분:</strong> {product.lastRefillAt}
                  </p>
                  <p className="subtext">{product.description}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {productDetail && (
        <div className="modal-overlay" onClick={closeProductDetail}>
          <div
            className="modal-card product-detail"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="modal-header">
              <div>
                <p className="eyebrow">상품 정보</p>
                <h3>{productDetail.name}</h3>
              </div>
              <button
                type="button"
                className="ghost-button small"
                onClick={closeProductDetail}
              >
                닫기
              </button>
            </header>
            <div className="product-detail-body">
              <div className="product-detail-media">
                <img
                  src={productDetail.image}
                  alt={`${productDetail.name} 이미지`}
                />
              </div>
              <div className="product-detail-info">
                <p className="subtext">{productDetail.supplier}</p>
                <div className="chip-row">
                  <span className="chip neutral">{productDetail.category}</span>
                  <span className="chip ghost">
                    {productDetail.status === "판매 중" ? "판매 중" : "숨김"}
                  </span>
                </div>
                <p className="product-detail-desc">
                  {productDetail.description}
                </p>
                <ul className="detail-meta">
                  <li>
                    <span>단가 (원/g)</span>
                    <strong>{productDetail.unitPrice}</strong>
                  </li>
                  <li>
                    <span>최근 소분</span>
                    <strong>{productDetail.lastRefillAt}</strong>
                  </li>
                  <li>
                    <span>위생/정보</span>
                    <strong>{productDetail.hygieneInfo}</strong>
                  </li>
                  <li>
                    <span>인증/메모</span>
                    <strong>{productDetail.compliance}</strong>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {isProductModalOpen && (
        <div className="modal-overlay" onClick={closeProductModal}>
          <div
            className="modal-card"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="modal-header">
              <div>
                <p className="eyebrow">
                  제품 {productModalMode === "create" ? "등록" : "수정"}
                </p>
                <h3>
                  {productModalMode === "create"
                    ? "새 상품 추가"
                    : "상품 정보 수정"}
                </h3>
              </div>
              <button
                type="button"
                className="ghost-button small"
                onClick={closeProductModal}
              >
                닫기
              </button>
            </header>
            <form className="product-form" onSubmit={handleProductSubmit}>
              <div className="form-grid">
                <label>
                  상품명
                  <input
                    name="name"
                    value={productForm.name}
                    onChange={handleProductFormChange}
                    placeholder="예: 라벤더 핸드워시"
                    required
                  />
                </label>
                <label>
                  공급처
                  <input
                    name="supplier"
                    value={productForm.supplier}
                    onChange={handleProductFormChange}
                    placeholder="예: 아모레퍼시픽"
                    required
                  />
                </label>
                <label>
                  카테고리
                  <input
                    name="category"
                    value={productForm.category}
                    onChange={handleProductFormChange}
                    placeholder="샴푸, 세제 등"
                  />
                </label>
                <label>
                  단가 (원/g)
                  <input
                    name="unitPrice"
                    type="number"
                    min="0"
                    value={productForm.unitPrice}
                    onChange={handleProductFormChange}
                    placeholder="예: 30"
                  />
                </label>
                <label>
                  최근 소분 일자
                  <input
                    name="lastRefillAt"
                    type="date"
                    value={productForm.lastRefillAt}
                    onChange={handleProductFormChange}
                  />
                </label>
                <label>
                  위생/정보
                  <input
                    name="compliance"
                    value={productForm.compliance}
                    onChange={handleProductFormChange}
                    placeholder="성분, 인증 마크 등"
                  />
                </label>
                <label className="textarea-field">
                  상품 상세 설명
                  <textarea
                    name="description"
                    rows={3}
                    value={productForm.description}
                    onChange={handleProductFormChange}
                    placeholder="고객용 태블릿에 노출될 정보"
                  />
                </label>
                <label>
                  상품 이미지
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  {productForm.image && (
                    <p className="subtext">업로드: {productForm.image}</p>
                  )}
                </label>
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  className="ghost-button"
                  onClick={closeProductModal}
                >
                  취소
                </button>
                <button type="submit" className="primary-button">
                  저장하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );

  const renderSales = () => (
    <section className="section">
      <div className="section-header">
        <div>
          <p className="eyebrow">매출 분석</p>
          <h2>Sales Analytics</h2>
        </div>
        <div className="chip-row">
          {analyticsRanges.map((range) => (
            <button
              key={range.id}
              type="button"
              className={`chip toggle ${
                analyticsRange === range.id ? "active" : ""
              }`}
              onClick={() => setAnalyticsRange(range.id)}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <div className="card-grid three-columns">
        <div className="card kpi-card">
          <p className="eyebrow">선택 기간 총 매출</p>
          <h3>
            {analyticsData.reduce((sum, row) => sum + row.sales, 0).toFixed(1)}{" "}
            억원
          </h3>
          <p className="subtext">{salesAnalytics.summary.total} 기준</p>
        </div>
        <div className="card kpi-card">
          <p className="eyebrow">평균 객단가</p>
          <h3>
            {(
              analyticsData.reduce((sum, row) => sum + row.avgOrder, 0) /
              analyticsData.length
            ).toFixed(1)}
            만원
          </h3>
          <p className="subtext">{salesAnalytics.summary.avgOrder} (전체)</p>
        </div>
        <div className="card kpi-card">
          <p className="eyebrow">재구매 비율</p>
          <h3>{salesAnalytics.summary.repeatRate}</h3>
          <p className="subtext">전월 대비 +3%p</p>
        </div>
      </div>

      <div className="card trend-card">
        <div className="section-header">
          <div>
            <p className="eyebrow">기간별 추이</p>
            <h2>
              {
                analyticsRanges.find((range) => range.id === analyticsRange)
                  .label
              }{" "}
              매출
            </h2>
          </div>
          <span className="chip neutral">단위: 억원</span>
        </div>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={analyticsData}>
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="label" tick={{ fill: "#475569" }} />
              <YAxis tick={{ fill: "#475569" }} />
              <Tooltip formatter={(value) => `${value} 억원`} />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="#0ea5e9"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#salesGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card analytics-table-card">
        <table>
          <thead>
            <tr>
              <th>기간</th>
              <th>매출 (억원)</th>
              <th>거래 건수</th>
              <th>평균 객단가 (만원)</th>
            </tr>
          </thead>
          <tbody>
            {analyticsData.map((row) => (
              <tr key={row.label}>
                <td>{row.label}</td>
                <td>{row.sales.toFixed(1)}</td>
                <td>{row.transactions.toLocaleString()}</td>
                <td>{row.avgOrder.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );

  return (
    <div
      className={`app-shell ${isSidebarCollapsed ? "sidebar-collapsed" : ""}`}
    >
      <aside className={`sidebar ${isSidebarCollapsed ? "collapsed" : ""}`}>
        <div className="sidebar-top">
          <div className="logo-container">
            <div className="logo">
              <img src="/logo_white.png" alt="미니 리필 스테이션 로고" />
              <p className="sidebar-subtext">리필, 모두의 습관이 되도록</p>
            </div>
            <button
              type="button"
              className="ghost-button small sidebar-toggle"
              onClick={toggleSidebar}
              aria-label={
                isSidebarCollapsed ? "사이드바 펼치기" : "사이드바 접기"
              }
              aria-expanded={!isSidebarCollapsed}
            >
              <span aria-hidden="true">{isSidebarCollapsed ? ">" : "<"}</span>
            </button>
          </div>
        </div>
        <nav>
          {menuItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`nav-button ${activeMenu === item.id ? "active" : ""}`}
              onClick={() => setActiveMenu(item.id)}
            >
              <span className="nav-label">{item.label}</span>
              <span className="nav-short">{item.shortLabel}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <p>오늘 매출</p>
          <strong>1,350,000원</strong>
          <p className="subtext">실시간 정산</p>
        </div>
      </aside>

      <main>
        <header className="page-header">
          <div>
            <p className="eyebrow">Mini Refill Station HQ</p>
            <h1>{menuItems.find((menu) => menu.id === activeMenu).label}</h1>
          </div>
          <div className="header-actions">
            <button className="ghost-button">알림센터</button>
            <button className="primary-button">보고서 내보내기</button>
          </div>
        </header>

        {activeMenu === "overview" && renderOverview()}
        {activeMenu === "stations" && renderStations()}
        {activeMenu === "products" && renderProducts()}
        {activeMenu === "sales" && renderSales()}
      </main>
    </div>
  );
}

export default App;
