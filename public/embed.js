.the-honest-badge {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.06);
  font-size: 16px;
  color: #111;
  max-width: 400px;
}

.score-icon {
  height: 28px;
  width: 28px;
  flex-shrink: 0;
}

.honest-logo {
  height: 36px;
  width: auto;
  margin-left: auto;
  flex-shrink: 0;
}

.the-honest-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.the-honest-score {
  font-size: 20px;
  font-weight: 700;
  color: #111;
  line-height: 1;
}

.the-honest-reviews {
  font-size: 13px;
  color: #555;
}

@media (max-width: 480px) {
  .the-honest-badge {
    flex-direction: column;
    align-items: flex-start;
  }

  .score-icon,
  .honest-logo {
    height: 24px;
  }

  .the-honest-score {
    font-size: 18px;
  }

  .the-honest-reviews {
    font-size: 12px;
  }
}
