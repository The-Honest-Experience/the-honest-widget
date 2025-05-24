.the-honest-badge {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);
  max-width: 300px;
  font-size: 14px;
}

.the-honest-score {
  font-size: 22px;
  font-weight: 700;
  color: #111;
}

.the-honest-reviews {
  font-size: 13px;
  color: #555;
}

.score-icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

.honest-logo {
  width: 36px;
  height: auto;
  margin-left: auto;
  flex-shrink: 0;
}

.the-details {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

@media (max-width: 400px) {
  .the-honest-badge {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .honest-logo {
    margin-left: 0;
  }
}
