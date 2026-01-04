import { defineComponent, ref, onMounted, onUnmounted, computed, watch, provide, h } from 'vue';
import { Project } from './project';
import { Designer } from '../designer/designer';

export interface ProjectViewProps {
  /**
   * 项目实例
   */
  project: Project;
  
  /**
   * 样式
   */
  style?: Record<string, any>;
  
  /**
   * 类名
   */
  className?: string;
}

export const ProjectView = defineComponent({
  name: 'ProjectView',
  props: {
    project: {
      type: Object as () => Project,
      required: true,
    },
    style: {
      type: Object as () => Record<string, any>,
      default: () => ({}),
    },
    className: {
      type: String,
      default: '',
    },
  },
  setup(props: ProjectViewProps) {
    const containerRef = ref<HTMLElement | null>(null);

    // 提供项目上下文
    provide('project', props.project);

    // 计算容器样式
    const containerStyle = computed(() => ({
      ...props.style,
      position: 'relative',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
    }));

    // 计算类名
    const containerClassName = computed(() => {
      const classNames = ['lc-project'];
      if (props.className) {
        classNames.push(props.className);
      }
      return classNames.join(' ');
    });

    // 监听项目变化
    watch(() => props.project.currentDocument, (document) => {
      console.log('Current document changed:', document);
    });

    // 组件挂载
    onMounted(() => {
      console.log('ProjectView mounted');
    });

    // 组件卸载
    onUnmounted(() => {
      console.log('ProjectView unmounted');
    });

    return () => {
      return h('div', {
        ref: containerRef,
        class: containerClassName.value,
        style: containerStyle.value,
      }, [
        h('div', {
          class: 'lc-project-content',
          style: {
            width: '100%',
            height: '100%',
          },
        }, [
          // 渲染当前文档
          props.project.currentDocument ? h('div', {
            class: 'lc-project-document',
          }, 'Document Content') : h('div', {
            class: 'lc-project-empty',
          }, 'No document selected'),
        ]),
      ]);
    };
  },
});

export default ProjectView;
