.the-honest-badge {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 14px;
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  font-size: 14px;
  color: #111;
  max-width: fit-content;
  line-height: 1.2;
}

.score-icon {
  height: 24px;
  width: 24px;
  flex-shrink: 0;
}

.honest-logo {
  height: 32px;
  width: auto;
  margin-left: 12px;
  flex-shrink: 0;
}

.the-honest-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
}

.the-honest-score {
  font-size: 22px;
  font-weight: 700;
  color: #111;
  line-height: 1;
}

.the-honest-reviews {
  font-size: 13px;
  color: #555;
  line-height: 1.2;
}

@media (max-width: 480px) {
  .the-honest-badge {
    flex-direction: column;
    align-items: flex-start;
  }

  .score-icon {
    height: 20px;
    width: 20px;
  }

  .honest-logo {
    height: 28px;
  }

  .the-honest-score {
    font-size: 20px;
  }

  .the-honest-reviews {
    font-size: 12px;
  }
}
