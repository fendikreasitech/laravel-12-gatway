<template>
  <div class="container-fluid p-4">
    <h1 class="h5 fw-semibold mb-3">Dashboard</h1>

    <div class="row g-3 mb-3">
      <div class="col-12 col-sm-6 col-lg-4" v-for="(stat, idx) in stats" :key="idx">
        <div class="card shadow-sm">
          <div class="card-body">
            <div class="text-muted small">{{ stat.label }}</div>
            <div class="h5 fw-semibold mb-0">{{ stat.value }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="row g-3">
      <div class="col-12 col-lg-8">
        <div class="card shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <div class="text-muted small">Traffic (last 7 days)</div>
              <div class="text-muted small">View</div>
            </div>

            <div class="ratio ratio-16x9">
              <!-- Simple SVG line chart with hard-coded points -->
              <svg viewBox="0 0 200 60" preserveAspectRatio="none">
                <polyline fill="none" stroke="#0d6efd" stroke-width="3"
                  points="0,40 28,30 56,20 84,26 112,14 140,22 168,10 200,18" />
                <g fill="#111827" font-size="9" opacity="0.7">
                  <text x="0" y="55">Mon</text>
                  <text x="28" y="55">Tue</text>
                  <text x="56" y="55">Wed</text>
                  <text x="84" y="55">Thu</text>
                  <text x="112" y="55">Fri</text>
                  <text x="140" y="55">Sat</text>
                  <text x="168" y="55">Sun</text>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-lg-4">
        <div class="card shadow-sm h-100">
          <div class="card-body">
            <div class="text-muted small mb-2">Recent Activity</div>
            <ul class="list-group list-group-flush">
              <li v-for="(item, i) in activities" :key="i" class="list-group-item py-2">
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const stats = ref([
  { label: 'Users', value: '1,234' },
  { label: 'Revenue', value: '$12,345' },
  { label: 'Orders', value: '321' },
])

const activities = ref([
  'User alice signed up',
  'Order #234 paid',
  'New comment on post #12',
  'Scheduled backup completed',
])
</script>

<style scoped>
/* Rely on Bootstrap 5 utilities; keep scoped file for potential component-specific tweaks */
</style>
