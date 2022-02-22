<template>
    <div id="pagination" class="noselect" v-cloak>
        <div class="main-pagination">
            <ul class="pagination pull-left justify-content-end">
                <li class="page-item first" :class="{ disabled: page == 1 }" @click="jump_page(1)">
                    <a href="#" class="page-link"><<</a>
                </li>
                <li class="page-item prev" :class="{ disabled: page - 1 < 1 }" @click="jump_page(page - 1)">
                    <a href="#" class="page-link"><</a>
                </li>
                <li class="page-item" 
                    :class="{ active: page == page_num }" 
                    v-for="(page_num, index) in page_items" 
                    :key="index" 
                    @click="jump_page(page_num)">
                    <a href="#" class="page-link">{{ page_num }}</a>
                </li>
                <li class="page-item next" :class="{ disabled: page + 1 > total_pages }" @click="jump_page(page + 1)">
                    <a href="#" class="page-link">></a>
                </li>
                <li class="page-item last" :class="{ disabled: page >= total_pages }" @click="jump_page(total_pages)">
                    <a href="#" class="page-link">>></a>
                </li>
            </ul>

            <div class="pagination-control">
                <span>跳至</span>

                <input class="form-control" type="number" min="1" placeholder="" @change="jump_page($event)" autocomplete="off"/>
                
                <span>頁</span>

                <div class="pagination-line" style="width: 1px;height: 28px;background: #4e4e4e80;top: 4px;"></div>

                <span for="pageLimit">每頁顯示</span>

                <select class="form-select" v-model.number="limit" @change="search(1)">
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>

                <span>筆</span>
            </div>
        </div>

        <div id="dis-page-result" class="noselect">
            顯示 {{ display_from }} 至 {{ display_to }} 共
            {{ total_records }} ({{ total_pages }} 頁)
        </div>
    </div>
</template>
<script>
export default {
    name: "pagination",
    data () {
        return {
            page: 1,
            limit: 20,
            total_records: 0,
            total_this_page_records: 0,
        };
    },
    computed: {
        display_from: function () {
            return Math.max((this.page - 1) * this.limit + 1, 0);
        },
        display_to: function () {
            return Math.min(this.page * this.limit, this.total_records);
        },
        total_pages: function () {
            return Math.ceil(this.total_records / this.limit);
        },
        page_items: function () {
            var page = parseInt(this.page);
            var min_page = Math.max(page - 2, 1);
            var max_page = Math.min(min_page + 4, this.total_pages);
            min_page = Math.max(max_page - 4, 1);
            var page_list = [];
            for (var i = min_page; i <= max_page; i++) {
                page_list.push(i);
            }
            if (page_list.length === 0) {
                page_list.push(1);
            }

            return page_list;
        },
    },
    methods: {
        is_page_num_valid (page) {
            return (
                page > 0 &&
                page <= this.total_pages &&
                page !== parseInt(this.page)
            );
        },
        jump_page (e) {
            let page = Number.isInteger(e) ? e : e.target.value;
            if (!this.is_page_num_valid(page)) {
                return;
            }
            this.search(page);
        },
        search (page) {
            this.$emit('searchService', {
                page: page,
                limit: this.limit
            });
        },
        setDataFromAPI (data) {
            this.total_records = data.total;
            this.limit = data.limit;
            this.page = data.page;
        }
    },
};
</script>
<style lang="scss" scoped>
#pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 0 1rem 1rem;
    font-size: 1.3rem;
    .main-pagination {
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
        .pagination {
            margin: 0;
            .page-item {
                .page-link {
                    padding: .8rem 1.3rem;
                    line-height: 1.42857;
                    border: none;
                }
                .page-link.active {
                    background-color: #1e91cf;
                    color: #fff;
                }
            }
            .page-item.disabled {
                cursor: not-allowed;
            }
        }
        .pagination-control {
            display: flex;
            align-items: center;
            justify-content: center;
            span {
                margin: 0 1.5rem;
            }
            .form-control,
            .form-select {
                width: 7.5rem;
            }
            .pagination-line {
                width: .1rem;
                height: 2.8rem;
                background: #4e4e4e80;
            }
        }
    }

    #dis-page-result {
        position: absolute; 
        right: 1.5rem;
        text-align: right;
    }
}
</style>
