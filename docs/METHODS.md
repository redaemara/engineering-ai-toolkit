# Calculation methods

Conversion: value × source SI factor / target SI factor. International inch = 0.0254 m; foot = 0.3048 m; pound = 0.45359237 kg. Area and volume factors are powers of the length factors.

Material: cross-sectional area in mm² × 10⁻⁶ × density in kg/m³ × length in m × count. RHS area = BH − (B−2t)(H−2t); CHS area = π(D²−(D−2t)²)/4. Rectangle centroidal Ix = BH³/12; hollow sections subtract inner inertia. Circular Ix = Iy = π(D⁴−d⁴)/64. Density must be explicitly supplied by the user. Custom profiles require known area and do not return inertia.

Cutting: for stock S, end allowance T per end, kerf K per piece, capacity C=S−2T. Each piece consumes L+K. Best-fit decreasing places descending pieces into the tightest feasible existing bar or a new bar. Lower bound = ceil(sum(L+K)/C). If achieved, bar count is globally minimum under this model; otherwise approximate. No claim of optimal remnant distribution. Product + kerf + trim + remnant = purchased. Remnant is physical leftover, not automatically waste or reusable. Maximum 5,000 pieces, integer mm only. No cutting angles or machining assumptions.

Takeoff: quantity = L, LW, or LWH times count. Cost = quantity × rate, consistent user-defined currency. Consumption: gross = net × (1+allowance/100); percentage is on net, not gross.
